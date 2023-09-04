import { FastifyRequest, FastifyReply } from "fastify";
import { MaterialCategory } from "db/types/MaterialTable";
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
  req: FastifyRequest<{ Body: { materialCategoryName: string } }>,
  res: FastifyReply
) => {
  try {
    if (!req.body.materialCategoryName) {
      throw new Error("missing required param: materialCategoryName");
    }
    const id = await createMaterialCategory(req.body.materialCategoryName);
    return res.status(201).send(id);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const handleUpdateMaterialCategoryRequest = async (
  req: FastifyRequest<{ Body: MaterialCategory }>,
  res: FastifyReply
) => {
  try {
    await updateMaterialCategory(req.body);
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
