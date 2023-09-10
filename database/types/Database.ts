import { AddressTable } from "./Address";
import { MaterialTable } from "./MaterialTable";
import { MaterialCategoryTable } from "./MaterialCategoryTable";
import { MaterialInventoryTable } from "./MaterialInventoryTable";
import { ClientTable } from "./Client";

export interface Database {
  material: MaterialTable;
  material_category: MaterialCategoryTable;
  material_inventory: MaterialInventoryTable;
  address: AddressTable;
  client: ClientTable;
}
