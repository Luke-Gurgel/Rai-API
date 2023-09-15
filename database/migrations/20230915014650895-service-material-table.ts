import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("service_material")
    .addColumn("serviceMaterialId", "serial", (col) => col.primaryKey())
    .addColumn("serviceId", "integer", (col) =>
      col.references("service.serviceId").onDelete("cascade").notNull()
    )
    .addColumn("materialId", "integer", (col) =>
      col.references("material.materialId").onDelete("cascade").notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("service_material").execute();
}
