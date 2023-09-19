import { AddressTable } from "./AddressTable";
import { MaterialTable } from "./MaterialTable";
import { MaterialCategoryTable } from "./MaterialCategoryTable";
import { MaterialInventoryTable } from "./MaterialInventoryTable";
import { ClientTable } from "./ClientTable";
import { ServiceTable } from "./ServiceTable";
import { ServiceMaterialTable } from "./ServiceMaterialTable";
import { ServiceOrderTable } from "./ServiceOrderTable";

export interface Database {
  material: MaterialTable;
  material_category: MaterialCategoryTable;
  material_inventory: MaterialInventoryTable;
  address: AddressTable;
  client: ClientTable;
  service: ServiceTable;
  service_material: ServiceMaterialTable;
  service_order: ServiceOrderTable;
}
