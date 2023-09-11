import { AddressTable } from "./AddressTable";
import { MaterialTable } from "./MaterialTable";
import { MaterialCategoryTable } from "./MaterialCategoryTable";
import { MaterialInventoryTable } from "./MaterialInventoryTable";
import { ClientTable } from "./ClientTable";

export interface Database {
  material: MaterialTable;
  material_category: MaterialCategoryTable;
  material_inventory: MaterialInventoryTable;
  address: AddressTable;
  client: ClientTable;
}
