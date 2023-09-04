import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { materialController } from "@/controllers/materialController";

export default async function materialRouter(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  server.get("/materials", materialController.handleGetMaterialsRequest);

  server.post("/materials", async (req, res) => {
    return { message: "material created" };
  });

  server.addSchema({
    $id: "",
  });

  server.patch("/materials/:id", async (req, res) => {
    return { message: "material updated" };
  });
}
