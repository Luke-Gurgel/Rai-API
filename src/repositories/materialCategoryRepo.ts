import { db } from "@/database";
import { UpdateResult } from "kysely";
import {
  MaterialCategory,
  MaterialCategoryUpdate,
} from "db/types/MaterialTable";

export interface MaterialCategoryRepo {
  getAll: () => Promise<MaterialCategory[]>;
  create: (name: string) => Promise<{
    materialCategoryId: number;
  }>;
  updateById: (
    id: number,
    update: MaterialCategoryUpdate
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
  id: number,
  update: MaterialCategoryUpdate
): Promise<UpdateResult> => {
  delete update.materialCategoryId;
  return db
    .updateTable("materialCategory")
    .set({ ...update })
    .where("materialCategoryId", "=", id)
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
