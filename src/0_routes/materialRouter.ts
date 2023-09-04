import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { materialController } from "@/1_controllers/materialController";

export default async function materialRouter(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  server.get("/materials", materialController.handleGetMaterialsRequest);

  server.addSchema({
    $id: "createMaterial",
    type: "object",
    required: [
      "name",
      "materialCategoryId",
      "principioAtivo",
      "grupoQuimico",
      "minQuantity",
    ],
    properties: {
      name: { type: "string" },
      materialCategoryId: { type: "number" },
      principioAtivo: { type: "string" },
      grupoQuimico: { type: "string" },
      minQuantity: { type: "number" },
    },
  });

  server.post(
    "/materials",
    { schema: { body: { $ref: "createMaterial#" } } },
    materialController.handleCreateMaterialRequest
  );

  server.addSchema({
    $id: "updateMaterial",
    type: "object",
    properties: {
      name: { type: "string" },
      materialCategoryId: { type: "number" },
      principioAtivo: { type: "string" },
      grupoQuimico: { type: "string" },
      minQuantity: { type: "number" },
    },
  });

  server.patch(
    "/materials/:id",
    {
      schema: {
        body: { $ref: "updateMaterial#" },
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
        },
      },
    },
    materialController.handleUpdateMaterialRequest
  );
}
