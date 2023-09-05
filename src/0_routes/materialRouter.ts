import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { materialController } from "@/1_controllers/materialController";
import {
  createMaterialSchema,
  updateMaterialRouteSchema,
} from "./schemas/material";

export default async function materialRouter(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  server.get("/materials", materialController.handleGetMaterialsRequest);

  server.post(
    "/materials",
    { schema: createMaterialSchema },
    materialController.handleCreateMaterialRequest
  );

  server.patch(
    "/materials/:id",
    { schema: updateMaterialRouteSchema },
    materialController.handleUpdateMaterialRequest
  );
}
