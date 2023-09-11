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
  updateByClientId: (
    clientId: number,
    update: AddressUpdate,
    transaction: Transaction<Database>
  ) => Promise<UpdateResult>;
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

const updateByClientId = (
  clientId: number,
  update: AddressUpdate,
  transaction: Transaction<Database>
): Promise<UpdateResult> => {
  delete update.addressId;
  return transaction
    .updateTable("address")
    .set({ ...update })
    .where("clientId", "=", clientId)
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
  updateByClientId,
  withAddress,
};
