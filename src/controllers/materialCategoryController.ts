import { FastifyRequest, FastifyReply } from "fastify";
import {
  NewMaterialCategory,
  MaterialCategoryUpdate,
} from "db/types/MaterialTable";
import {
  getMaterialCategories,
  createMaterialCategory,
  updateMaterialCategory,
} from "@/useCases/materialCategoryUseCases";

const handleGetMaterialCategoriesRequest = async (
  _: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const materialCategories = await getMaterialCategories();
    return res.status(200).send({ materialCategories });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const handleCreateMaterialCategoryRequest = async (
  req: FastifyRequest<{ Body: NewMaterialCategory }>,
  res: FastifyReply
) => {
  try {
    const id = await createMaterialCategory(req.body.name);
    return res.status(201).send(id);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const handleUpdateMaterialCategoryRequest = async (
  req: FastifyRequest<{ Body: MaterialCategoryUpdate; Params: { id: number } }>,
  res: FastifyReply
) => {
  try {
    const { id } = req.params;
    await updateMaterialCategory(id, req.body);
    return res.status(200).send();
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const materialCategoryController = {
  handleGetMaterialCategoriesRequest,
  handleCreateMaterialCategoryRequest,
  handleUpdateMaterialCategoryRequest,
};
