import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import 'dotenv/config';

// this is the file responsible for creating the pool connections
const pool = new Pool({
    connectionString: process.env.YEELODB_URL,
});

const db = drizzle(pool);

async function main() {
    console.log("migration started...");
    await migrate(db, {
        migrationsFolder: "drizzle",
    })
    console.log("migration ended...");
    process.exit(0);
}

main().catch((e) => {
    console.log('Error migrating: ', e);
    process.exit(0);
})
