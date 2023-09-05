import { db } from "@/database";
import { UpdateResult } from "kysely";
import {
  MaterialCategory,
  MaterialCategoryUpdate,
} from "db/types/MaterialCategoryTable";

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
    .insertInto("MaterialCategory")
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
    .updateTable("MaterialCategory")
    .set({ ...update })
    .where("materialCategoryId", "=", id)
    .executeTakeFirst();
};

const getAll = (): Promise<MaterialCategory[]> => {
  return db.selectFrom("MaterialCategory").selectAll().execute();
};

export const materialCategoryRepo: MaterialCategoryRepo = {
  getAll,
  create,
  updateById,
};
