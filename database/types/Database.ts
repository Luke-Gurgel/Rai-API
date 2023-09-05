import { MaterialTable } from "./MaterialTable";
import { MaterialCategoryTable } from "./MaterialCategoryTable";
import { MaterialInventoryTable } from "./MaterialInventoryTable";

export interface Database {
  Material: MaterialTable;
  MaterialCategory: MaterialCategoryTable;
  MaterialInventory: MaterialInventoryTable;
}
