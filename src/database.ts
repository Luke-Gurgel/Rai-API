import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { Database } from "db/types/Database";

const { DB_HOST, DB_USER, DB_PWD, DB_PORT, DB_NAME } = process.env;

const dialect = new PostgresDialect({
  pool: new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
    port: Number(DB_PORT),
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
  log: ["error", "query"],
});
