import { materialCategoryRepo } from "@/repositories/materialCategoryRepo";
import { MaterialCategory } from "db/types/MaterialTable";

export const createMaterialCategory = async (materialCategoryName: string) => {
  return await materialCategoryRepo.create(materialCategoryName);
};

export const getMaterialCategories = async () => {
  return await materialCategoryRepo.getAll();
};

export const updateMaterialCategory = async (
  updatedMaterialCategory: MaterialCategory
) => {
  await materialCategoryRepo.updateById(updatedMaterialCategory);
};
