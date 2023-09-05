import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { materialCategoryController } from "@/1_controllers/materialCategoryController";
import {
  createMaterialCategorySchema,
  updateMaterialCategorySchema,
} from "./schemas/materialCategory";

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
    { schema: createMaterialCategorySchema },
    materialCategoryController.handleCreateMaterialCategoryRequest
  );

  server.put(
    "/material-categories/:id",
    { schema: updateMaterialCategorySchema },
    materialCategoryController.handleUpdateMaterialCategoryRequest
  );
}
