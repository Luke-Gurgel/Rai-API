import { db } from "@/database";
import { UpdateResult } from "kysely";
import {
  NewMaterialInventory,
  MaterialInventoryUpdate,
} from "db/types/MaterialInventoryTable";

export interface MaterialInventoryRepo {
  create: (
    materialInventory: NewMaterialInventory
  ) => Promise<{ inventoryId: number }>;
  updateById: (
    id: number,
    update: MaterialInventoryUpdate
  ) => Promise<UpdateResult>;
}

const create = (
  materialInventory: NewMaterialInventory
): Promise<{ inventoryId: number }> => {
  return db
    .insertInto("material_inventory")
    .values({ ...materialInventory })
    .returning(["inventoryId"])
    .executeTakeFirstOrThrow();
};

const updateById = (
  id: number,
  update: MaterialInventoryUpdate
): Promise<UpdateResult> => {
  delete update.inventoryId;
  return db
    .updateTable("material_inventory")
    .set({ ...update })
    .where("inventoryId", "=", id)
    .executeTakeFirst();
};

export const materialInventoryRepo: MaterialInventoryRepo = {
  create,
  updateById,
};
