import { db } from "@/database";
import { UpdateResult } from "kysely";
import {
  NewMaterialInventory,
  MaterialInventoryUpdate,
} from "db/types/MaterialInventoryTable";

export interface MaterialInventoryRepo {
  create: (
    materialInventory: NewMaterialInventory
  ) => Promise<{ materialInventoryId: number }>;
  updateById: (
    id: number,
    update: MaterialInventoryUpdate
  ) => Promise<UpdateResult>;
}

const create = (
  materialInventory: NewMaterialInventory
): Promise<{ materialInventoryId: number }> => {
  return db
    .insertInto("MaterialInventory")
    .values({ ...materialInventory })
    .returning(["materialInventoryId"])
    .executeTakeFirstOrThrow();
};

const updateById = (
  id: number,
  update: MaterialInventoryUpdate
): Promise<UpdateResult> => {
  delete update.materialInventoryId;
  return db
    .updateTable("MaterialInventory")
    .set({ ...update })
    .where("materialInventoryId", "=", id)
    .executeTakeFirst();
};

export const materialInventoryRepo: MaterialInventoryRepo = {
  create,
  updateById,
};
