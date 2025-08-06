import "dotenv/config";
import { defineConfig } from "drizzle-kit";

declare global {
  interface Process {
    env: {
      DATABASE_ID: string;
      ACCOUNT_ID: string;
      TOKEN: string;
      NODE_ENV: string;
    };
  }

  var process: Process;
}

const cloudflareConfig = defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.ACCOUNT_ID,
    databaseId: process.env.DATABASE_ID,
    token: process.env.TOKEN,
  },
});

const localConfig = defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: `file:.wrangler/state/v3/d1/miniflare-D1DatabaseObject/8ac1c363e2e3fa36c62430dd1308f50260f159bef178a9666395fc74b1dc1a93.sqlite`,
  },
});

const config =
  process.env.NODE_ENV === "production" ? cloudflareConfig : localConfig;
console.log(
  `Using ${
    process.env.NODE_ENV === "production" ? "cloudflare" : "local"
  } config`
);
export default config;
