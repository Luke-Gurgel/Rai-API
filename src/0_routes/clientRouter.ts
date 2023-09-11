import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { clientController } from "@/1_controllers/clientController";
import { createClientSchema } from "./schemas/client";

export default async function materialCategoryRouter(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  server.get("/clients", clientController.handleGeClientsRequest);

  server.post(
    "/clients",
    { schema: createClientSchema },
    clientController.handleCreateClientRequest
  );

  // server.put(
  //   "/material-categories/:id",
  //   { schema: updateMaterialCategorySchema },
  //   clientController.handleUpdateMaterialCategoryRequest
  // );
}
