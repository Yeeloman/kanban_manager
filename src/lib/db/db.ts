// import { drizzle } from "drizzle-orm/node-postgres";
// import { Client } from "pg";
import * as schema from './schema';
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { YEELODB_URL } from '$env/static/private';

const client = neon(YEELODB_URL);

// const client = new Client({
//     connectionString:process.env.YEELODB_URL
// })

// client.connect()

const db = drizzle(client, {
    schema: schema
})

export default db;
