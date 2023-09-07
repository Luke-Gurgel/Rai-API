import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("material_inventory")
    .addColumn("inventoryId", "serial", (col) => col.primaryKey())
    .addColumn("materialId", "integer", (col) =>
      col.references("material.materialId")
    )
    .addColumn("lote", "varchar(50)", (col) => col.notNull())
    .addColumn("price", "numeric(10, 2)", (col) => col.notNull())
    .addColumn("quantity", "integer", (col) => col.notNull())
    .addColumn("expDate", "date", (col) => col.notNull())
    .addColumn("purchaseDate", "date", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("material_inventory").execute();
}
