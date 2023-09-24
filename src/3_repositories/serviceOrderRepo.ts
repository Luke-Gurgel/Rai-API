import { db } from "@/database";
import { UpdateResult, sql } from "kysely";
import {
  ServiceOrder,
  NewServiceOrder,
  ServiceOrderUpdate,
} from "db/types/ServiceOrderTable";

export interface ServiceOrderRepo {
  getByPeriod: (fromDate: Date, toDate: Date) => Promise<ServiceOrder[]>;
  create: (
    serviceOrder: NewServiceOrder
  ) => Promise<{ serviceOrderId: number }>;
  updateById: (id: number, update: ServiceOrderUpdate) => Promise<UpdateResult>;
}

const getByPeriod = async (
  fromDate: Date,
  toDate: Date
): Promise<ServiceOrder[]> => {
  const { rows } = await sql<ServiceOrder>`
    WITH service_order_with_date AS (
      SELECT
        "serviceOrderId",
        "serviceId",
        "clientId",
        warranty,
        to_timestamp("dateTime" / 1000)::timestamp AT TIME ZONE 'UTC' AT TIME ZONE 'America/Bahia' AS "dateTime"
      FROM service_order
    )
    SELECT 
      "serviceOrderId",
      "serviceId",
      "clientId",
      warranty,
      "dateTime"
    FROM service_order_with_date
    WHERE "dateTime" >= ${fromDate} AND "dateTime" < ${toDate}
    ORDER BY "dateTime" ASC;
  `.execute(db);
  return rows;
};

const create = (
  serviceOrder: NewServiceOrder
): Promise<{ serviceOrderId: number }> => {
  return db
    .insertInto("service_order")
    .values({ ...serviceOrder })
    .returning(["serviceOrderId"])
    .executeTakeFirstOrThrow();
};

const updateById = (
  id: number,
  update: ServiceOrderUpdate
): Promise<UpdateResult> => {
  delete update.serviceOrderId;
  return db
    .updateTable("service_order")
    .set({ ...update })
    .where("serviceOrderId", "=", id)
    .executeTakeFirst();
};

export const serviceOrderRepo: ServiceOrderRepo = {
  create,
  updateById,
  getByPeriod,
};
