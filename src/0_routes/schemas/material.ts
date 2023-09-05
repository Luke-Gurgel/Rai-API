const updateMaterialBodySchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    materialCategoryId: { type: "number" },
    principioAtivo: { type: "string" },
    grupoQuimico: { type: "string" },
    minQuantity: { type: "number" },
  },
};

const updateMaterialParamsSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
  },
};

export const updateMaterialRouteSchema = {
  body: updateMaterialBodySchema,
  params: updateMaterialParamsSchema,
};

export const createMaterialSchema = {
  body: {
    ...updateMaterialBodySchema,
    required: [
      "name",
      "materialCategoryId",
      "principioAtivo",
      "grupoQuimico",
      "minQuantity",
    ],
  },
};
