const updateMaterialInventoryBodySchema = {
  type: "object",
  properties: {
    materialId: { type: "number" },
    lote: { type: "string" },
    price: { type: "number" },
    quantity: { type: "number" },
    expDate: { type: "string" },
    purchaseDate: { type: "string" },
  },
};

const updateMaterialInventoryParamsSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
  },
};

export const updateMaterialInventoryRouteSchema = {
  body: updateMaterialInventoryBodySchema,
  params: updateMaterialInventoryParamsSchema,
};

export const createMaterialInventorySchema = {
  body: {
    ...updateMaterialInventoryParamsSchema,
    required: [
      "materialId",
      "lote",
      "price",
      "quantity",
      "expDate",
      "purchaseDate",
    ],
  },
};
