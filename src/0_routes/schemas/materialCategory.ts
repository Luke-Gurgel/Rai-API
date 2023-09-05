export const createMaterialCategorySchema = {
  body: {
    type: "object",
    required: ["name"],
    properties: { name: { type: "string" } },
  },
};

export const updateMaterialCategorySchema = {
  body: { ...createMaterialCategorySchema.body },
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
  },
};
