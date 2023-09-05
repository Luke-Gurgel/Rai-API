import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("MaterialInventory")
    .addColumn("materialInventoryId", "serial", (col) => col.primaryKey())
    .addColumn("materialId", "integer", (col) =>
      col.references("Material.materialId")
    )
    .addColumn("lote", "varchar(50)", (col) => col.notNull())
    .addColumn("lastPrice", "numeric(10, 2)", (col) => col.notNull())
    .addColumn("quantity", "integer", (col) => col.notNull())
    .addColumn("expDate", "date", (col) => col.notNull())
    .addColumn("lastPurchaseDate", "date", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("MaterialInventory").execute();
}
