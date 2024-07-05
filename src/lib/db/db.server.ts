import * as schema from './schema';
import { YEELODB_URL } from '$env/static/private';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
// import 'dotenv/config'


const client = postgres(YEELODB_URL);
// const client = postgres(process.env.YEELODB_URL as string);

const db = drizzle(client, {
  schema: schema
})

export default db;
