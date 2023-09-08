import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("address")
    .addColumn("addressId", "serial", (col) => col.primaryKey())
    .addColumn("street", "varchar(255)", (col) => col.notNull())
    .addColumn("number", "integer", (col) => col.notNull())
    .addColumn("neighborhood", "varchar(255)", (col) => col.notNull())
    .addColumn("cep", "varchar(8)", (col) => col.notNull())
    .addColumn("city", "varchar(255)", (col) => col.notNull())
    .addColumn("state", "varchar(2)", (col) => col.notNull())
    .addColumn("complement", "varchar(255)")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("address").execute();
}
