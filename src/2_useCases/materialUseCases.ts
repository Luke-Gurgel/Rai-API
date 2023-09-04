import { materialRepo } from "@/3_repositories/materialRepo";
import { NewMaterial, MaterialUpdate } from "db/types/MaterialTable";

export const getMaterials = async () => {
  return await materialRepo.getAll();
};

export const createMaterial = async (material: NewMaterial) => {
  return await materialRepo.create(material);
};

export const updateMaterial = async (id: number, update: MaterialUpdate) => {
  return await materialRepo.updateById(id, update);
};
