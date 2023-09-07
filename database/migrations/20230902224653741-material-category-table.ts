import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("material_category")
    .addColumn("categoryId", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(50)", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("material_category").execute();
}
