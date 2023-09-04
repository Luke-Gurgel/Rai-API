import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { materialCategoryController } from "@/controllers/materialCategoryController";

export default async function materialCategoryRouter(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  server.get(
    "/material-categories",
    materialCategoryController.handleGetMaterialCategoriesRequest
  );

  server.post(
    "/material-categories",
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
    "/material-categories",
    { schema: { body: { $ref: "updateMaterialCategory#" } } },
    materialCategoryController.handleUpdateMaterialCategoryRequest
  );
}
