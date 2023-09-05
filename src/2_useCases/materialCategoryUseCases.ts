import { materialCategoryRepo } from "@/3_repositories/materialCategoryRepo";
import { MaterialCategoryUpdate } from "db/types/MaterialCategoryTable";

export const createMaterialCategory = async (name: string) => {
  return await materialCategoryRepo.create(name);
};

export const getMaterialCategories = async () => {
  return await materialCategoryRepo.getAll();
};

export const updateMaterialCategory = async (
  id: number,
  update: MaterialCategoryUpdate
) => {
  await materialCategoryRepo.updateById(id, update);
};
