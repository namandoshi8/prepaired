import { defineConfig } from "drizzle-kit";

/** @type {import('drizzle-kit').Config} */
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials: {
    url: "postgresql://PrepAIred_owner:5eDs3dXQcfGA@ep-divine-silence-a5itdari.us-east-2.aws.neon.tech/PrepAIred?sslmode=require",
  },
});
