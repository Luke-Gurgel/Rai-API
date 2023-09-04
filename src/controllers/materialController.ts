import { FastifyRequest, FastifyReply } from "fastify";
import {
  getMaterialList,
  getMaterialCategories,
  createMaterialCategory,
} from "@/useCases/materials";

const handleGetMaterialsRequest = async (
  _: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const materialList = await getMaterialList();
    return res.status(200).send({ materialList });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const handleGetMaterialCategoriesRequest = async (
  _: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const materialList = await getMaterialList();
    return res.status(200).send({ materialList });
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
    return res.status(201).send({ matericalCategoryId: id });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const materialController = {
  handleGetMaterialsRequest,
  handleGetMaterialCategoriesRequest,
  handleCreateMaterialCategoryRequest,
};
