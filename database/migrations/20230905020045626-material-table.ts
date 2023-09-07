import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("material")
    .addColumn("materialId", "serial", (col) => col.primaryKey())
    .addColumn("categoryId", "integer", (col) =>
      col.references("material_category.categoryId")
    )
    .addColumn("name", "varchar(50)", (col) => col.notNull())
    .addColumn("minQuantity", "integer", (col) => col.notNull())
    .addColumn("grupoQuimico", "varchar", (col) => col.notNull())
    .addColumn("principioAtivo", "varchar", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("material").execute();
}
