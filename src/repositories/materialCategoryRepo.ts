import { db } from "@/database";
import { UpdateResult } from "kysely";
import { MaterialCategory } from "db/types/MaterialTable";

export interface MaterialCategoryRepo {
  getAll: () => Promise<MaterialCategory[]>;
  create: (name: string) => Promise<{
    materialCategoryId: number;
  }>;
  updateById: (
    updatedMaterialCategory: MaterialCategory
  ) => Promise<UpdateResult>;
}

const create = (
  name: string
): Promise<{
  materialCategoryId: number;
}> => {
  return db
    .insertInto("materialCategory")
    .values({ name })
    .returning(["materialCategoryId"])
    .executeTakeFirstOrThrow();
};

const updateById = (
  updatedMaterialCategory: MaterialCategory
): Promise<UpdateResult> => {
  return db
    .updateTable("materialCategory")
    .set({ name: updatedMaterialCategory.name })
    .where(
      "materialCategoryId",
      "=",
      updatedMaterialCategory.materialCategoryId
    )
    .executeTakeFirst();
};

const getAll = (): Promise<MaterialCategory[]> => {
  return db.selectFrom("materialCategory").selectAll().execute();
};

export const materialCategoryRepo: MaterialCategoryRepo = {
  getAll,
  create,
  updateById,
};
