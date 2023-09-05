import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("MaterialCategory")
    .addColumn("materialCategoryId", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(50)", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("MaterialCategory").execute();
}
