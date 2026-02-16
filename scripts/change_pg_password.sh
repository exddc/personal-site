#!/usr/bin/env bash
set -euo pipefail

# Changes a Postgres user's password using admin credentials from DATABASE_ADMIN_URL.
#
# Usage:
#   ./change_pg_password.sh <db_user> [--password NEW_PASSWORD] [--db-name DB_NAME] [--update-env]
#
# Example:
#   export DATABASE_ADMIN_URL=postgres://postgres:admin-pass@127.0.0.1:5432/postgres
#   ./change_pg_password.sh litecustomer_user --db-name litecustomer --update-env

die() { echo "Error: $*" >&2; exit 1; }

if [[ $# -lt 1 ]]; then
  die "Missing <db_user>. Usage: $0 <db_user> [--password NEW_PASSWORD] [--db-name DB_NAME] [--update-env]"
fi

DB_USER="$1"
shift || true

NEW_PASSWORD=""
DB_NAME=""
UPDATE_ENV=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --password) NEW_PASSWORD="$2"; shift 2;;
    --db-name) DB_NAME="$2"; shift 2;;
    --update-env) UPDATE_ENV=1; shift;;
    -h|--help)
      sed -n '1,140p' "$0"
      exit 0
      ;;
    *)
      die "Unknown option: $1"
      ;;
  esac
done

# Validate identifiers (simple/safe)
if ! [[ "$DB_USER" =~ ^[a-z][a-z0-9_]{0,62}$ ]]; then
  die "db_user must match ^[a-z][a-z0-9_]{0,62}$ (lowercase, digits, underscore; start with letter; <=63 chars)"
fi
if [[ -n "${DB_NAME}" ]] && ! [[ "$DB_NAME" =~ ^[a-z][a-z0-9_]{0,62}$ ]]; then
  die "db_name must match ^[a-z][a-z0-9_]{0,62}$ (lowercase, digits, underscore; start with letter; <=63 chars)"
fi

# Generate strong password when not provided
gen_pass() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -base64 36 | tr -d '\n' | tr '/+' '_-' | cut -c1-32
  else
    LC_ALL=C tr -dc 'A-Za-z0-9_-' </dev/urandom | head -c 32
  fi
}
if [[ -z "${NEW_PASSWORD}" ]]; then
  NEW_PASSWORD="$(gen_pass)"
fi

# Ensure admin url is available (load from .env.local if present)
if [[ -z "${DATABASE_ADMIN_URL:-}" ]]; then
  ENV_LOCAL_PATH="$(dirname "$0")/../.env.local"
  if [[ -f "${ENV_LOCAL_PATH}" ]]; then
    DATABASE_ADMIN_URL="$(awk -F= '/^DATABASE_ADMIN_URL=/{sub(/^DATABASE_ADMIN_URL=/,""); print; exit}' "${ENV_LOCAL_PATH}")"
    DATABASE_ADMIN_URL="${DATABASE_ADMIN_URL%\"}"
    DATABASE_ADMIN_URL="${DATABASE_ADMIN_URL#\"}"
  fi
fi
: "${DATABASE_ADMIN_URL:?Set DATABASE_ADMIN_URL (e.g. from .env.local) to the admin postgres connection string.}"

# Split out any query params so we can preserve them
ADMIN_URL_BASE="${DATABASE_ADMIN_URL%%\?*}"
ADMIN_URL_QUERY=""
if [[ "${DATABASE_ADMIN_URL}" == *\?* ]]; then
  ADMIN_URL_QUERY="?${DATABASE_ADMIN_URL#*\?}"
fi

# Strip database name to build new connection strings
ADMIN_URL_NO_DB="${ADMIN_URL_BASE%/*}"
ADMIN_DB_URL="${ADMIN_URL_BASE}${ADMIN_URL_QUERY}"

# Parse scheme + host:port for optional DATABASE_URL output
SCHEME="${ADMIN_URL_NO_DB%%://*}"
REST="${ADMIN_URL_NO_DB#*://}"
if [[ "${REST}" != *@* ]]; then
  die "DATABASE_ADMIN_URL must include credentials (user:password@host:port)."
fi
HOST_PORT="${REST#*@}"

psql_admin() {
  psql "${ADMIN_DB_URL}" -v ON_ERROR_STOP=1 -X -q "$@"
}

# Pre-flight: connect
psql_admin -c "SELECT 1;" >/dev/null || die "Cannot connect with provided admin credentials."

ROLE_EXISTS="$(psql_admin -tAc "SELECT 1 FROM pg_roles WHERE rolname='${DB_USER}'")"
if [[ "${ROLE_EXISTS}" != "1" ]]; then
  die "Role '${DB_USER}' does not exist."
fi

# Escape single quotes in password for SQL
SQL_PASSWORD="${NEW_PASSWORD//\'/\'\'}"
psql_admin -c "ALTER ROLE \"${DB_USER}\" WITH PASSWORD '${SQL_PASSWORD}';"

DB_URL=""
if [[ -n "${DB_NAME}" ]]; then
  DB_URL="${SCHEME}://${DB_USER}:${NEW_PASSWORD}@${HOST_PORT}/${DB_NAME}${ADMIN_URL_QUERY}"
fi

update_env_file() {
  local env_file="$1"
  if [[ ! -f "${env_file}" ]]; then
    return 0
  fi

  local tmp_file
  tmp_file="$(mktemp)"
  awk -v url="${DB_URL}" '
    BEGIN { updated = 0 }
    /^DATABASE_URL=/ { print "DATABASE_URL=" url; updated = 1; next }
    { print }
    END { if (!updated) print "DATABASE_URL=" url }
  ' "${env_file}" > "${tmp_file}"
  mv "${tmp_file}" "${env_file}"
}

if [[ "${UPDATE_ENV}" -eq 1 ]]; then
  if [[ -z "${DB_URL}" ]]; then
    die "--update-env requires --db-name to build DATABASE_URL."
  fi
  update_env_file "$(dirname "$0")/../.env.local"
  update_env_file "$(dirname "$0")/../.env.example"
fi

cat <<EOF

# --- Updated password ---
DB_USER=${DB_USER}
DB_PASSWORD=${NEW_PASSWORD}
$(if [[ -n "${DB_URL}" ]]; then echo "DATABASE_URL=${DB_URL}"; fi)

EOF