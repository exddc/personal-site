import { randomUUID } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { hashPassword } from "better-auth/crypto";
import { and, eq } from "drizzle-orm";
import { getDb } from "../app/db";
import { account, user } from "../app/db/auth-schema";

const MIN_PASSWORD_LENGTH = 8;

async function promptRequired(
  rl: ReturnType<typeof createInterface>,
  label: string,
) {
  while (true) {
    const value = (await rl.question(label)).trim();
    if (value) {
      return value;
    }
    console.log("Value cannot be empty.");
  }
}

async function promptAdminEmail(rl: ReturnType<typeof createInterface>) {
  while (true) {
    const email = (await rl.question("Admin email: ")).trim().toLowerCase();
    if (!email) {
      console.log("Email cannot be empty.");
      continue;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      console.log("Please enter a valid email address.");
      continue;
    }

    return email;
  }
}

async function promptAdminPassword(rl: ReturnType<typeof createInterface>) {
  while (true) {
    const password = await promptRequired(
      rl,
      `Admin password (min ${MIN_PASSWORD_LENGTH} chars): `,
    );

    if (password.length < MIN_PASSWORD_LENGTH) {
      console.log(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
      );
      continue;
    }

    const confirmation = await promptRequired(rl, "Confirm password: ");

    if (password !== confirmation) {
      console.log("Passwords do not match. Try again.");
      continue;
    }

    return password;
  }
}

async function seedAdminUser() {
  console.log("\n--- LiteCMS Admin User Setup ---\n");

  const db = getDb();
  if (!db) {
    throw new Error(
      "DATABASE_URL is not configured. Set DATABASE_URL before running this script.",
    );
  }

  const rl = createInterface({ input: stdin, output: stdout });

  try {
    const defaultName = "Admin";
    const nameInput = (await rl.question(`Admin name [${defaultName}]: `)).trim();
    const adminName = nameInput || defaultName;
    const adminEmail = await promptAdminEmail(rl);
    const adminPassword = await promptAdminPassword(rl);

    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, adminEmail),
      columns: { id: true, role: true },
    });

    const now = new Date();
    const passwordHash = await hashPassword(adminPassword);

    let userId = existingUser?.id;

    if (existingUser) {
      await db
        .update(user)
        .set({
          name: adminName,
          role: "admin",
          updatedAt: now,
        })
        .where(eq(user.id, existingUser.id));

      console.log(`Updated existing user ${adminEmail} and set role to admin.`);
    } else {
      userId = randomUUID();

      await db.insert(user).values({
        id: userId,
        name: adminName,
        email: adminEmail,
        emailVerified: true,
        role: "admin",
        banned: false,
        createdAt: now,
        updatedAt: now,
      });

      console.log(`Created admin user ${adminEmail}.`);
    }

    if (!userId) {
      throw new Error("Failed to resolve admin user id.");
    }

    const credentialAccount = await db.query.account.findFirst({
      where: and(eq(account.userId, userId), eq(account.providerId, "credential")),
      columns: { id: true },
    });

    if (credentialAccount) {
      await db
        .update(account)
        .set({ password: passwordHash, updatedAt: now })
        .where(eq(account.id, credentialAccount.id));

      console.log("Updated existing credential password.");
    } else {
      await db.insert(account).values({
        id: randomUUID(),
        accountId: userId,
        providerId: "credential",
        userId,
        password: passwordHash,
        createdAt: now,
        updatedAt: now,
      });

      console.log("Created credential account for admin user.");
    }

    console.log("\nAdmin setup complete.\n");
  } finally {
    rl.close();
  }
}

seedAdminUser()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    const isMissingRoleColumn = message.includes('column "role" does not exist');

    if (isMissingRoleColumn) {
      console.error(
        "Failed to seed admin user: auth migration is missing. Run `bun run db:migrate` first, then rerun this script.",
      );
    } else {
      console.error("Failed to seed admin user:", error);
    }

    process.exit(1);
  });
