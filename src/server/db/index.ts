import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";

import * as authSchema from "./schemas/auth.schema";
import * as gameSchema from "./schemas/game.schema";
import * as groupSchema from "./schemas/group.schema";
import * as teamSchema from "./schemas/team.schema";

/**
 * This is the main database schema for the application. It combines all individual schemas. It makes all schemas available
 * in the `db` object, which is used throughout the application to interact with the database
 */
export const dbSchema = {
  ...authSchema,
  ...gameSchema,
  ...groupSchema,
  ...teamSchema,
};

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema: dbSchema });
