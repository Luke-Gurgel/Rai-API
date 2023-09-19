import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { clientController } from "@/1_controllers/clientController";
import { createClientSchema, updateClientSchema } from "./schemas/client";

export default async function clientRouter(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  server.get("/clients", clientController.handleGeClientsRequest);

  server.post(
    "/clients",
    { schema: createClientSchema },
    clientController.handleCreateClientRequest
  );

  server.patch(
    "/clients/:id",
    { schema: updateClientSchema },
    clientController.handleUpdateClientRequest
  );
}
