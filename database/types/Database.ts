import { MaterialTable } from "./MaterialTable";
import { MaterialCategoryTable } from "./MaterialCategoryTable";
import { MaterialInventoryTable } from "./MaterialInventoryTable";

export interface Database {
  material: MaterialTable;
  material_category: MaterialCategoryTable;
  material_inventory: MaterialInventoryTable;
}
