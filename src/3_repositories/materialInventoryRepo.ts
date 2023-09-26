import { db } from "@/database";
import { Database } from "db/types/Database";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import { ExpressionBuilder, SelectExpression, UpdateResult } from "kysely";
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
  withInventory: (
    eb: ExpressionBuilder<Database, "material">
  ) => SelectExpression<Database, "material">;
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

const withInventory = (eb: ExpressionBuilder<Database, "material">) => {
  return jsonArrayFrom(
    eb
      .selectFrom("material_inventory")
      .select([
        "inventoryId",
        "lote",
        "price",
        "expDate",
        "quantity",
        "purchaseDate",
      ])
      .whereRef("material_inventory.materialId", "=", "material.materialId")
  ).as("inventory");
};

export const materialInventoryRepo: MaterialInventoryRepo = {
  create,
  updateById,
  withInventory,
};
