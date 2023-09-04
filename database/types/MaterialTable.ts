import {
  Generated,
  Insertable,
  Selectable,
  Updateable,
  ColumnType,
} from "kysely";

export interface MaterialCategoryTable {
  materialCategoryId: Generated<number>;
  name: string;
}

export interface MaterialTable {
  materialId: Generated<number>;
  materialCategoryId: number;
  principioAtivo: string;
  grupoQuimico: string;
  minQuantity: number;
  name: string;
}

export interface MaterialInventoryTable {
  materialInventoryId: Generated<number>;
  materialId: number;
  lote: string;
  price: number;
  quantity: number;
  expDate: ColumnType<Date, string>;
  purchaseDate: ColumnType<Date, string>;
}

export type MaterialCategory = Selectable<MaterialCategoryTable>;
export type NewMaterialCategory = Insertable<MaterialCategoryTable>;
export type MaterialCategoryUpdate = Updateable<MaterialCategoryTable>;

export type Material = Selectable<MaterialTable>;
export type NewMaterial = Insertable<MaterialTable>;
export type MaterialUpdate = Updateable<MaterialTable>;

export type MaterialMaterialInventory = Selectable<MaterialInventoryTable>;
export type NewMaterialMaterialInventory = Insertable<MaterialInventoryTable>;
export type MaterialMaterialInventoryUpdate =
  Updateable<MaterialInventoryTable>;
