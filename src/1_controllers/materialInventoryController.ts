import { FastifyRequest, FastifyReply } from "fastify";
import {
  NewMaterialInventory,
  MaterialInventoryUpdate,
} from "db/types/MaterialInventoryTable";
import {
  createMaterialInventory,
  updateMaterialInventory,
} from "@/2_useCases/materialInventoryUseCases";

const handleCreateMaterialInventoryRequest = async (
  req: FastifyRequest<{ Body: NewMaterialInventory }>,
  res: FastifyReply
) => {
  try {
    const { inventoryId } = await createMaterialInventory(req.body);
    return res.status(201).send({ inventoryId });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const handleUpdateMaterialInventoryRequest = async (
  req: FastifyRequest<{
    Body: MaterialInventoryUpdate;
    Params: { id: number };
  }>,
  res: FastifyReply
) => {
  try {
    const { id } = req.params;
    await updateMaterialInventory(id, req.body);
    return res.status(200).send();
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const materialInventoryController = {
  handleCreateMaterialInventoryRequest,
  handleUpdateMaterialInventoryRequest,
};
