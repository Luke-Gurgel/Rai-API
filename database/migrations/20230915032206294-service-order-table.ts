import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("service_order")
    .addColumn("serviceOrderId", "serial", (col) => col.primaryKey())
    .addColumn("serviceId", "integer", (col) =>
      col.references("service.serviceId").onDelete("cascade").notNull()
    )
    .addColumn("clientId", "integer", (col) =>
      col.references("client.clientId").onDelete("cascade").notNull()
    )
    .addColumn("warranty", "integer", (col) => col.notNull())
    .addColumn("dateTime", "bigint", (col) => col.notNull())
    .addColumn("additionalInfo", "varchar")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("service_order").execute();
}
