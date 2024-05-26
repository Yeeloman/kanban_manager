import * as schema from '@/db/schema';
import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from 'drizzle-orm';


const client = postgres(process.env.YEELODB_URL as string);

const db = drizzle(client, {
    schema:schema
})

const main = async () => {
    try {
        deleteTableContent()
        deleteTables()
        console.log('Seeding finished...')
        process.exit(0)
    } catch (e) {
        console.log(e);
        throw new Error("Failed to seed database");
    }
}

const deleteTableContent = async () => {
        await db.delete(schema.sessionTable);
        await db.delete(schema.usersTable);
        await db.delete(schema.dashBoardTable);
        await db.delete(schema.categoriesTable);
        await db.delete(schema.tasksTable);
        await db.delete(schema.subTasksTable);
}

const deleteTables = async () => {
        await db.execute(sql`DROP TABLE IF EXISTS sessions;`);
        await db.execute(sql`DROP TABLE IF EXISTS users;`);
        await db.execute(sql`DROP TABLE IF EXISTS dashboard;`);
        await db.execute(sql`DROP TABLE IF EXISTS category;`);
        await db.execute(sql`DROP TABLE IF EXISTS task;`);
        await db.execute(sql`DROP TABLE IF EXISTS subtask;`);
}

main();
