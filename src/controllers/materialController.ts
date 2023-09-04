import { FastifyRequest, FastifyReply } from "fastify";
import { NewMaterial, MaterialUpdate } from "db/types/MaterialTable";
import {
  getMaterials,
  createMaterial,
  updateMaterial,
} from "@/useCases/materialUseCases";

const handleGetMaterialsRequest = async (
  _: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const materialList = await getMaterials();
    return res.status(200).send({ materialList });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const handleCreateMaterialRequest = async (
  req: FastifyRequest<{ Body: NewMaterial }>,
  res: FastifyReply
) => {
  try {
    const { materialId } = await createMaterial(req.body);
    return res.status(201).send({ materialId });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const handleUpdateMaterialRequest = async (
  req: FastifyRequest<{ Body: MaterialUpdate; Params: { id: number } }>,
  res: FastifyReply
) => {
  try {
    const { id } = req.params;
    await updateMaterial(id, req.body);
    return res.status(200).send();
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const materialController = {
  handleGetMaterialsRequest,
  handleCreateMaterialRequest,
  handleUpdateMaterialRequest,
};
