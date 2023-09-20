import { Database } from "db/types/Database";
import { Transaction, DeleteResult, InsertResult } from "kysely";

export interface ServiceMaterialRepo {
  create: (
    serviceId: number,
    materialIds: number[],
    transaction: Transaction<Database>
  ) => Promise<InsertResult[]>;
  deleteByServiceId: (
    serviceId: number,
    transaction: Transaction<Database>
  ) => Promise<DeleteResult[]>;
}

const create = (
  serviceId: number,
  materialIds: number[],
  transaction: Transaction<Database>
): Promise<InsertResult[]> => {
  const values = materialIds.map((materialId) => ({ materialId, serviceId }));
  return transaction.insertInto("service_material").values(values).execute();
};

const deleteByServiceId = (
  serviceId: number,
  transaction: Transaction<Database>
): Promise<DeleteResult[]> => {
  return transaction
    .deleteFrom("service_material")
    .where("serviceId", "=", serviceId)
    .execute();
};

export const serviceMaterialRepo: ServiceMaterialRepo = {
  create,
  deleteByServiceId,
};
