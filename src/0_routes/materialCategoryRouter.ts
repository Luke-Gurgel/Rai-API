import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { materialCategoryController } from "@/1_controllers/materialCategoryController";

export default async function materialCategoryRouter(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  server.get(
    "/material-categories",
    materialCategoryController.handleGetMaterialCategoriesRequest
  );

  server.addSchema({
    $id: "createMaterialCategory",
    type: "object",
    required: ["name"],
    properties: { name: { type: "string" } },
  });

  server.post(
    "/material-categories",
    { schema: { body: { $ref: "createMaterialCategory#" } } },
    materialCategoryController.handleCreateMaterialCategoryRequest
  );

  server.addSchema({
    $id: "updateMaterialCategory",
    type: "object",
    required: ["name", "materialCategoryId"],
    properties: {
      name: { type: "string" },
      materialCategoryId: { type: "number" },
    },
  });

  server.put(
    "/material-categories/:id",
    {
      schema: {
        body: { $ref: "updateMaterialCategory#" },
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
        },
      },
    },
    materialCategoryController.handleUpdateMaterialCategoryRequest
  );
}
