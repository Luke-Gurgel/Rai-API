import { db } from "@/database";
import { UpdateResult } from "kysely";
import { Material, NewMaterial, MaterialUpdate } from "db/types/MaterialTable";

export interface MaterialRepo {
  getAll: () => Promise<Material[]>;
  create: (material: NewMaterial) => Promise<{
    materialId: number;
  }>;
  updateById: (id: number, update: MaterialUpdate) => Promise<UpdateResult>;
}

const getAll = (): Promise<Material[]> => {
  return db.selectFrom("material").selectAll().execute();
};

const create = (material: NewMaterial): Promise<{ materialId: number }> => {
  return db
    .insertInto("material")
    .values({ ...material })
    .returning(["materialId"])
    .executeTakeFirstOrThrow();
};

const updateById = (
  id: number,
  update: MaterialUpdate
): Promise<UpdateResult> => {
  delete update.materialId;
  return db
    .updateTable("material")
    .set({ ...update })
    .where("materialId", "=", id)
    .executeTakeFirst();
};

export const materialRepo: MaterialRepo = { getAll, create, updateById };
