import { db } from "@/database";
import { UpdateResult } from "kysely";
import { materialCategoryRepo } from "./materialCategoryRepo";
import { materialInventoryRepo } from "./materialInventoryRepo";
import { MaterialInventory } from "db/types/MaterialInventoryTable";
import { Material, NewMaterial, MaterialUpdate } from "db/types/MaterialTable";

export interface MaterialRepo {
  getAll: () => Promise<GetAllMaterialsResult[]>;
  create: (material: NewMaterial) => Promise<{
    materialId: number;
  }>;
  updateById: (id: number, update: MaterialUpdate) => Promise<UpdateResult>;
}

interface GetAllMaterialsResult extends Material {
  category: string;
  inventory: MaterialInventory[];
}

const getAll = async (): Promise<GetAllMaterialsResult[]> => {
  const out = await db
    .selectFrom("material")
    .select([
      "materialId",
      "name",
      "minQuantity",
      "grupoQuimico",
      "principioAtivo",
    ])
    .select((eb) => [
      materialCategoryRepo.withCategory(eb),
      materialInventoryRepo.withInventory(eb),
    ])
    .execute();
  return out as unknown as GetAllMaterialsResult[];
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
