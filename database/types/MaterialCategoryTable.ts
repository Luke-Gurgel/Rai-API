import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface MaterialCategoryTable {
  categoryId: Generated<number>;
  name: string;
}

export type MaterialCategory = Selectable<MaterialCategoryTable>;
export type NewMaterialCategory = Insertable<MaterialCategoryTable>;
export type MaterialCategoryUpdate = Updateable<MaterialCategoryTable>;
