import {
  Generated,
  Insertable,
  Selectable,
  Updateable,
  ColumnType,
} from "kysely";

export interface MaterialInventoryTable {
  inventoryId: Generated<number>;
  materialId: number;
  lote: string;
  price: number;
  quantity: number;
  expDate: ColumnType<Date, string>;
  purchaseDate: ColumnType<Date, string>;
}

export type MaterialInventory = Selectable<MaterialInventoryTable>;
export type NewMaterialInventory = Insertable<MaterialInventoryTable>;
export type MaterialInventoryUpdate = Updateable<MaterialInventoryTable>;
