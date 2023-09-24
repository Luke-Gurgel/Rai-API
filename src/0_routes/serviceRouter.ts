import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { serviceController } from "@/1_controllers/serviceController";
import { createServiceSchema, updateServiceSchema } from "./schemas/service";

export default async function serviceRouter(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  server.get("/services", serviceController.handleGeServicesRequest);

  server.post(
    "/services",
    { schema: createServiceSchema },
    serviceController.handleCreateServiceRequest
  );

  server.patch(
    "/services/:id",
    { schema: updateServiceSchema },
    serviceController.handleUpdateServiceRequest
  );
}
