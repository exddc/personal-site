#!/usr/bin/env bash
set -euo pipefail

# Creates a Postgres database + user with a strong password, updates env files,
# runs migrations, and seeds the initial admin user.
#
# Admin credentials are read from DATABASE_ADMIN_URL in your env
#
# Usage:
#   ./create_pg_db.sh <db_name> [--skip-migrate] [--skip-admin-seed]
#
# Example:
#   export DATABASE_ADMIN_URL=postgres://postgres:admin-pass@127.0.0.1:5432/postgres
#   ./create_pg_db.sh myapp
#
# Output updates:
#   .env.local
#   .env.example

die() { echo "Error: $*" >&2; exit 1; }

if [[ $# -lt 1 ]]; then
  die "Missing <db_name>. Usage: $0 <db_name> [--skip-migrate] [--skip-admin-seed]"
fi

DB_NAME="$1"
shift || true

RUN_MIGRATE=1
RUN_ADMIN_SEED=1

while [[ $# -gt 0 ]]; do
  case "$1" in
    --skip-migrate)
      RUN_MIGRATE=0
      shift
      ;;
    --skip-admin-seed)
      RUN_ADMIN_SEED=0
      shift
      ;;
    -h|--help)
      sed -n '1,140p' "$0"
      exit 0
      ;;
    *)
      die "Unknown option: $1"
      ;;
  esac
done

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Ensure admin url is available (load from .env.local if present)
if [[ -z "${DATABASE_ADMIN_URL:-}" ]]; then
  ENV_LOCAL_PATH="${ROOT_DIR}/.env.local"
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

# Parse scheme + host:port for building DATABASE_URL
SCHEME="${ADMIN_URL_NO_DB%%://*}"
REST="${ADMIN_URL_NO_DB#*://}"
if [[ "${REST}" != *@* ]]; then
  die "DATABASE_ADMIN_URL must include credentials (user:password@host:port)."
fi
HOST_PORT="${REST#*@}"

# Validate db name for safe identifiers (keep it simple & safe)
# Allowed: lowercase letters, digits, underscore; must start with letter; max 63 chars
if ! [[ "$DB_NAME" =~ ^[a-z][a-z0-9_]{0,62}$ ]]; then
  die "db_name must match ^[a-z][a-z0-9_]{0,62}$ (lowercase, digits, underscore; start with letter; <=63 chars)"
fi

# Derive username (<=63 chars)
DB_USER="${DB_NAME}_user"
if [[ ${#DB_USER} -gt 63 ]]; then
  DB_USER="${DB_NAME:0:55}_user"
fi

# Generate strong password
gen_pass() {
  if command -v openssl >/dev/null 2>&1; then
    # 32 chars-ish, URL/env friendly, good entropy
    openssl rand -base64 36 | tr -d '\n' | tr '/+' '_-' | cut -c1-32
  else
    # Fallback
    LC_ALL=C tr -dc 'A-Za-z0-9_-' </dev/urandom | head -c 32
  fi
}
DB_PASSWORD="$(gen_pass)"

# Helper to run psql as admin
psql_admin() {
  psql "${ADMIN_DB_URL}" -v ON_ERROR_STOP=1 -X -q "$@"
}

# Pre-flight: connect
psql_admin -c "SELECT 1;" >/dev/null || die "Cannot connect with provided admin credentials."

# Check if role/db already exist (fail fast to avoid surprises)
ROLE_EXISTS="$(psql_admin -tAc "SELECT 1 FROM pg_roles WHERE rolname='${DB_USER}'")"
DB_EXISTS="$(psql_admin -tAc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'")"

if [[ "${ROLE_EXISTS}" == "1" ]]; then
  die "Role '${DB_USER}' already exists. Choose a different db name or drop the role first."
fi
if [[ "${DB_EXISTS}" == "1" ]]; then
  die "Database '${DB_NAME}' already exists. Choose a different name or drop the database first."
fi

# Create role + db (db owned by role)
psql_admin -c "CREATE ROLE \"${DB_USER}\" LOGIN ENCRYPTED PASSWORD '${DB_PASSWORD}';"
psql_admin -c "CREATE DATABASE \"${DB_NAME}\" OWNER \"${DB_USER}\";"

# Optional hardening: lock down public schema a bit (common best practice)
DB_URL="${SCHEME}://${DB_USER}:${DB_PASSWORD}@${HOST_PORT}/${DB_NAME}${ADMIN_URL_QUERY}"
psql "${DB_URL}" -v ON_ERROR_STOP=1 -X -q -c "REVOKE ALL ON SCHEMA public FROM PUBLIC;"
psql "${DB_URL}" -v ON_ERROR_STOP=1 -X -q -c "GRANT USAGE, CREATE ON SCHEMA public TO \"${DB_USER}\";"

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

# Print env lines (copy/paste)
cat <<ENV_OUT

# --- Copy into your .env ---
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
DATABASE_URL=${DB_URL}

ENV_OUT

update_env_file "${ROOT_DIR}/.env.local"
update_env_file "${ROOT_DIR}/.env.example"

if [[ "${RUN_MIGRATE}" -eq 1 ]]; then
  if ! command -v bun >/dev/null 2>&1; then
    die "bun is required to run migrations automatically. Install bun or rerun with --skip-migrate."
  fi

  echo "Running database migrations..."
  (cd "${ROOT_DIR}" && bun run db:migrate)
fi

if [[ "${RUN_ADMIN_SEED}" -eq 1 ]]; then
  if ! command -v bun >/dev/null 2>&1; then
    die "bun is required to run admin seed automatically. Install bun or rerun with --skip-admin-seed."
  fi

  echo "Starting interactive admin setup..."
  (cd "${ROOT_DIR}" && bun scripts/seed_admin_user.ts)
fi

HAS_RESEND_KEY=0
if [[ -n "${RESEND_API_KEY:-}" ]]; then
  HAS_RESEND_KEY=1
elif [[ -f "${ROOT_DIR}/.env.local" ]] && grep -Eq '^RESEND_API_KEY=.+$' "${ROOT_DIR}/.env.local"; then
  HAS_RESEND_KEY=1
fi

if [[ "${HAS_RESEND_KEY}" -eq 0 ]]; then
  cat <<WARN

Note: RESEND_API_KEY is not configured.
- Development: password reset links will be logged to the server console.
- Production: missing RESEND_API_KEY will cause reset email sending to fail.

WARN
fi
