import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  out: "./drizzle",
  driver: "turso",
  schema: "src/lib/server/database/schema.ts",
  dbCredentials: {
    url: process.env.DB_URL!,
    authToken: process.env.DB_TOKEN!,
  },
});
