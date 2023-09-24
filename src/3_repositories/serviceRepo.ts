import { db } from "@/database";
import { Database } from "db/types/Database";
import { UpdateResult, Transaction, sql } from "kysely";
import { GetServicesResponse } from "@/0_routes/schemas/service";
import { NewService, ServiceUpdate } from "db/types/ServiceTable";

export interface ServiceRepo {
  getAll: () => Promise<GetServicesResponse[]>;
  create: (
    service: NewService,
    transaction: Transaction<Database>
  ) => Promise<{ serviceId: number }>;
  updateById: (
    id: number,
    update: ServiceUpdate,
    transaction: Transaction<Database>
  ) => Promise<UpdateResult>;
}

const getAll = async (): Promise<GetServicesResponse[]> => {
  const { rows } = await sql<GetServicesResponse>`
    SELECT
      s.name,
      (
        SELECT json_agg(sm."materialId")
        FROM service_material sm
        WHERE s."serviceId" = sm."serviceId"
      ) AS "materialIds"
    FROM
      service s;
  `.execute(db);
  return rows;
};

const create = (
  service: NewService,
  transaction: Transaction<Database>
): Promise<{ serviceId: number }> => {
  return transaction
    .insertInto("service")
    .values({ ...service })
    .returning(["serviceId"])
    .executeTakeFirstOrThrow();
};

const updateById = (
  id: number,
  update: ServiceUpdate,
  transaction: Transaction<Database>
): Promise<UpdateResult> => {
  delete update.serviceId;
  return transaction
    .updateTable("service")
    .set({ ...update })
    .where("serviceId", "=", id)
    .executeTakeFirst();
};

export const serviceRepo: ServiceRepo = { getAll, create, updateById };
