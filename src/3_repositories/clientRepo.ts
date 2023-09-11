import { db } from "@/database";
import { addressRepo } from "./addressRepo";
import { Database } from "db/types/Database";
import { UpdateResult, Transaction } from "kysely";
import { Client, NewClient, ClientUpdate } from "db/types/ClientTable";

export interface ClientRepo {
  getAll: () => Promise<Client[]>;
  create: (
    client: NewClient,
    transaction: Transaction<Database>
  ) => Promise<{ clientId: number }>;
  updateById: (
    id: number,
    update: ClientUpdate,
    transaction: Transaction<Database>
  ) => Promise<UpdateResult>;
}

const getAll = (): Promise<Client[]> => {
  return db
    .selectFrom("client")
    .selectAll()
    .select((eb) => [addressRepo.withAddress(eb)])
    .execute();
};

const create = (
  client: NewClient,
  transaction: Transaction<Database>
): Promise<{ clientId: number }> => {
  return transaction
    .insertInto("client")
    .values({ ...client })
    .returning(["clientId"])
    .executeTakeFirstOrThrow();
};

const updateById = (
  id: number,
  update: ClientUpdate,
  transaction: Transaction<Database>
): Promise<UpdateResult> => {
  delete update.clientId;
  return transaction
    .updateTable("client")
    .set({ ...update })
    .where("clientId", "=", id)
    .executeTakeFirst();
};

export const clientRepo: ClientRepo = {
  getAll,
  create,
  updateById,
};
