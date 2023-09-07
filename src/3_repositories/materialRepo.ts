import { db } from "@/database";
import { UpdateResult, sql } from "kysely";
import { Material, NewMaterial, MaterialUpdate } from "db/types/MaterialTable";

export interface MaterialRepo {
  getAll: () => Promise<Material[]>;
  create: (material: NewMaterial) => Promise<{
    materialId: number;
  }>;
  updateById: (id: number, update: MaterialUpdate) => Promise<UpdateResult>;
}

const getAll = async (): Promise<any[]> => {
  const out = await sql`
    SELECT
      m."materialId",
      m.name,
      m."grupoQuimico",
      m."principioAtivo",
      m."minQuantity",
      mc.name AS category,
      COALESCE(
        (SELECT json_agg(json_build_object(
          'inventoryId', mi."inventoryId",
          'lote', mi.lote,
          'price', mi.price,
          'quantity', mi.quantity,
          'expDate', mi."expDate",
          'purchaseDate', mi."purchaseDate"
        )) 
        FROM material_inventory mi
        WHERE mi."materialId" = m."materialId"), '[]'
      ) AS inventory
    FROM
      material m
    JOIN
      material_category mc ON m."categoryId" = mc."categoryId"
    ORDER BY
      m."materialId";
  `.execute(db);

  return out.rows;
};

const create = (material: NewMaterial): Promise<{ materialId: number }> => {
  return db
    .insertInto("material")
    .values({ ...material })
    .returning(["materialId"])
    .executeTakeFirstOrThrow();
};

const updateById = (
  id: number,
  update: MaterialUpdate
): Promise<UpdateResult> => {
  delete update.materialId;
  return db
    .updateTable("material")
    .set({ ...update })
    .where("materialId", "=", id)
    .executeTakeFirst();
};

export const materialRepo: MaterialRepo = { getAll, create, updateById };
