import { db } from "@/database";
import { Database } from "db/types/Database";
import { jsonObjectFrom } from "kysely/helpers/postgres";
import { Address, NewAddress, AddressUpdate } from "db/types/AddressTable";
import {
  Transaction,
  UpdateResult,
  ExpressionBuilder,
  AliasedRawBuilder,
} from "kysely";

export interface AddressRepo {
  create: (
    address: NewAddress,
    transaction: Transaction<Database>
  ) => Promise<{ addressId: number }>;
  updateById: (id: number, update: AddressUpdate) => Promise<UpdateResult>;
  withAddress: (
    eb: ExpressionBuilder<Database, "client">
  ) => AliasedRawBuilder<Address | null, "address">;
}

const create = (
  address: NewAddress,
  transaction: Transaction<Database>
): Promise<{ addressId: number }> => {
  return transaction
    .insertInto("address")
    .values({ ...address })
    .returning(["addressId"])
    .executeTakeFirstOrThrow();
};

const updateById = (
  id: number,
  update: AddressUpdate
): Promise<UpdateResult> => {
  delete update.addressId;
  return db
    .updateTable("address")
    .set({ ...update })
    .where("addressId", "=", id)
    .executeTakeFirst();
};

const withAddress = (eb: ExpressionBuilder<Database, "client">) => {
  return jsonObjectFrom(
    eb
      .selectFrom("address")
      .selectAll()
      .whereRef("clientId", "=", "client.clientId")
  ).as("address");
};

export const addressRepo: AddressRepo = {
  create,
  updateById,
  withAddress,
};
