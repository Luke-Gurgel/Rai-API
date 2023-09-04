import { db } from "@/database";
import { Material } from "db/types/MaterialTable";

export interface MaterialRepo {
  getAll: () => Promise<Material[]>;
  // create: (material: Material) => MaterialId;
  // updateById: (materialId: MaterialId) => void;
}

const getAll = (): Promise<Material[]> => {
  return db.selectFrom("material").selectAll().execute();
};

export const materialRepo: MaterialRepo = { getAll };
