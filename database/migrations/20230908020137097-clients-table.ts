import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createType("client_type").asEnum(["PF", "PJ"]).execute();
  await db.schema
    .createTable("client")
    .addColumn("clientId", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(255)")
    .addColumn("fantasyName", "varchar(255)")
    .addColumn("razaoSocial", "varchar(255)")
    .addColumn("cpf", "varchar(11)", (col) => col.unique())
    .addColumn("cnpj", "varchar(14)", (col) => col.unique())
    .addColumn("type", sql`client_type`, (col) => col.notNull())
    .addColumn("tel", "varchar(11)", (col) => col.notNull().unique())
    .addColumn("email", "varchar(255)", (col) => col.notNull().unique())
    .addCheckConstraint(
      "client_type_constraint",
      sql`
      (type = 'PF' AND cpf IS NOT NULL AND name IS NOT NULL)
      OR
      (type = 'PJ' AND cnpj IS NOT NULL AND "fantasyName" IS NOT NULL AND "razaoSocial" IS NOT NULL)
      `
    )
    .addCheckConstraint("tel_length", sql`length(tel) = 11`)
    .addCheckConstraint("cpf_length", sql`length(cpf) = 11`)
    .addCheckConstraint("cnpj_length", sql`length(cnpj) = 14`)
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("client").execute();
  await db.schema.dropType("client_type").execute();
}
