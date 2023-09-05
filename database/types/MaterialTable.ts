import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface MaterialTable {
  materialId: Generated<number>;
  materialCategoryId: number;
  principioAtivo: string;
  grupoQuimico: string;
  minQuantity: number;
  name: string;
}

export type Material = Selectable<MaterialTable>;
export type NewMaterial = Insertable<MaterialTable>;
export type MaterialUpdate = Updateable<MaterialTable>;
