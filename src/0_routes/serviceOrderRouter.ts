import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { serviceOrderController } from "@/1_controllers/serviceOrderController";
import {
  createServiceOrderSchema,
  updateServiceOrderSchema,
} from "./schemas/serviceOrder";

export default async function serviceRouter(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  server.get(
    "/service-orders",
    serviceOrderController.handleGetServiceOrdersRequest
  );

  server.post(
    "/service-orders",
    { schema: createServiceOrderSchema },
    serviceOrderController.handleCreateServiceOrderRequest
  );

  server.patch(
    "/service-orders/:id",
    { schema: updateServiceOrderSchema },
    serviceOrderController.handleUpdateServiceOrderRequest
  );
}
