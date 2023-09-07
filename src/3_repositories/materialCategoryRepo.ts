import { db } from "@/database";
import { UpdateResult } from "kysely";
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

export const materialCategoryRepo: MaterialCategoryRepo = {
  getAll,
  create,
  updateById,
};
