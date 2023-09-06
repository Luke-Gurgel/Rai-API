import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { materialInventoryController } from "@/1_controllers/materialInventoryController";
import {
  createMaterialInventorySchema,
  updateMaterialInventoryRouteSchema,
} from "./schemas/materialInventory";

export default async function materialInventoryRouter(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  server.post(
    "/material-inventory",
    { schema: createMaterialInventorySchema },
    materialInventoryController.handleCreateMaterialInventoryRequest
  );

  server.patch(
    "/material-inventory/:id",
    { schema: updateMaterialInventoryRouteSchema },
    materialInventoryController.handleUpdateMaterialInventoryRequest
  );
}
