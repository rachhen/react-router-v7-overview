import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  schema: "./app/lib/db/schema.ts",
  out: "./app/lib/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  casing: "snake_case",
  breakpoints: true,
  verbose: true,
});
