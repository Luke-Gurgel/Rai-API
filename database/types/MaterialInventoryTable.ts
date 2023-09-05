import {
  Generated,
  Insertable,
  Selectable,
  Updateable,
  ColumnType,
} from "kysely";

export interface MaterialInventoryTable {
  materialInventoryId: Generated<number>;
  materialId: number;
  lote: string;
  lastPrice: number;
  quantity: number;
  expDate: ColumnType<Date, string>;
  lastPurchaseDate: ColumnType<Date, string>;
}

export type MaterialMaterialInventory = Selectable<MaterialInventoryTable>;
export type NewMaterialMaterialInventory = Insertable<MaterialInventoryTable>;
export type MaterialMaterialInventoryUpdate =
  Updateable<MaterialInventoryTable>;
