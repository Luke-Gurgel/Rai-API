import { materialRepo } from "@/repositories/materialRepo";

export const getMaterialList = async () => {
  return await materialRepo.getAll();
};
