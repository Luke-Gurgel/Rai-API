import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("Material")
    .addColumn("materialId", "serial", (col) => col.primaryKey())
    .addColumn("materialCategoryId", "integer", (col) =>
      col.references("MaterialCategory.materialCategoryId")
    )
    .addColumn("name", "varchar(50)", (col) => col.notNull())
    .addColumn("minQuantity", "integer", (col) => col.notNull())
    .addColumn("grupoQuimico", "varchar", (col) => col.notNull())
    .addColumn("principioAtivo", "varchar", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("Material").execute();
}
