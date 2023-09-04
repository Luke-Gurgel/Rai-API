import {
  MaterialTable,
  MaterialCategoryTable,
  MaterialInventoryTable,
} from "./MaterialTable";

export interface Database {
  material: MaterialTable;
  materialCategory: MaterialCategoryTable;
  materialInventory: MaterialInventoryTable;
}
