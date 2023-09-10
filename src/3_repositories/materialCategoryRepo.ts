import { db } from "@/database";
import { Database } from "db/types/Database";
import {
  UpdateResult,
  ExpressionBuilder,
  AliasedSelectQueryBuilder,
} from "kysely";
import {
  MaterialCategory,
  MaterialCategoryUpdate,
} from "db/types/MaterialCategoryTable";

export interface MaterialCategoryRepo {
  getAll: () => Promise<MaterialCategory[]>;
  create: (name: string) => Promise<{
    categoryId: number;
  }>;
  updateById: (
    id: number,
    update: MaterialCategoryUpdate
  ) => Promise<UpdateResult>;
  withCategory: (
    eb: ExpressionBuilder<Database, "material">
  ) => AliasedSelectQueryBuilder<{ name: string }, "category">;
}

const create = (
  name: string
): Promise<{
  categoryId: number;
}> => {
  return db
    .insertInto("material_category")
    .values({ name })
    .returning(["categoryId"])
    .executeTakeFirstOrThrow();
};

const updateById = (
  id: number,
  update: MaterialCategoryUpdate
): Promise<UpdateResult> => {
  delete update.categoryId;
  return db
    .updateTable("material_category")
    .set({ ...update })
    .where("categoryId", "=", id)
    .executeTakeFirst();
};

const getAll = (): Promise<MaterialCategory[]> => {
  return db.selectFrom("material_category").selectAll().execute();
};

const withCategory = (eb: ExpressionBuilder<Database, "material">) => {
  return eb
    .selectFrom("material_category")
    .select("name")
    .whereRef("categoryId", "=", "material.categoryId")
    .as("category");
};

export const materialCategoryRepo: MaterialCategoryRepo = {
  getAll,
  create,
  updateById,
  withCategory,
};
