import { defineConfig } from "drizzle-kit"
import 'dotenv/config';

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/lib/db/schema.ts",
    out: './supabase/migrations',
    dbCredentials: {
        url: process.env.YEELODB_URL!
    }
})
