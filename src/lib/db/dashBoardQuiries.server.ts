import db from '@/db/db.server';
import { sessionTable, usersTable } from './schema';
import type { newUser } from './schemaTypes';
import { eq } from 'drizzle-orm';
