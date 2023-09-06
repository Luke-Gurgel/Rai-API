import { materialInventoryRepo } from "@/3_repositories/materialInventoryRepo";
import {
  NewMaterialInventory,
  MaterialInventoryUpdate,
} from "db/types/MaterialInventoryTable";

export const createMaterialInventory = async (
  material: NewMaterialInventory
) => {
  return await materialInventoryRepo.create(material);
};

export const updateMaterialInventory = async (
  id: number,
  update: MaterialInventoryUpdate
) => {
  return await materialInventoryRepo.updateById(id, update);
};
