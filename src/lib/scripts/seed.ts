import * as schema from '@/db/schema';
import 'dotenv/config';
// import { YEELODB_URL } from '$env/static/private';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from 'drizzle-orm';


const client = postgres(process.env.YEELODB_URL as string);

const db = drizzle(client, {
    schema:schema
})

const main = async () => {
    try {
        await db.delete(schema.sessionTable);
        await db.delete(schema.usersTable);
        await db.execute(sql`DROP TABLE IF EXISTS sessions;`);
        await db.execute(sql`DROP TABLE IF EXISTS users;`);
        console.log('Seeding finished...')
        process.exit(0)
    } catch (e) {
        console.log(e);
        throw new Error("Failed to seed database");
    }
}

main();
