import { defineConfig } from "drizzle-kit"
import 'dotenv/config';

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/lib/db/schema.ts",
    dbCredentials: {
        host: process.env.YEELODB_HOST as string,
        user: process.env.YEELODB_USER as string,
        password: process.env.YEELODB_PASSWORD as string,
        database: process.env.YEELODB_NAME as string,
    }
})
