import { FastifyRequest, FastifyReply } from "fastify";
import {
  NewServiceOrder,
  ServiceOrderUpdate,
} from "db/types/ServiceOrderTable";
import {
  getServiceOrders,
  createServiceOrder,
  updateServiceOrder,
} from "@/2_useCases/serviceOrderUseCases";

const handleGetServiceOrdersRequest = async (
  req: FastifyRequest<{ Querystring: { month: number; year: number } }>,
  res: FastifyReply
) => {
  try {
    const { month, year } = req.query;
    if (!month || !year) {
      throw new Error("Favor passar o mês e o ano da busca");
    }

    const serviceOrders = await getServiceOrders(month, year);
    return res.status(200).send({ serviceOrders });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const handleCreateServiceOrderRequest = async (
  req: FastifyRequest<{ Body: NewServiceOrder }>,
  res: FastifyReply
) => {
  try {
    const serviceOrder = req.body;
    const { serviceOrderId } = await createServiceOrder(serviceOrder);
    return res.status(201).send({ serviceOrderId });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const handleUpdateServiceOrderRequest = async (
  req: FastifyRequest<{
    Body: ServiceOrderUpdate;
    Params: { id: number };
  }>,
  res: FastifyReply
) => {
  try {
    const { id } = req.params;
    const serviceOrderUpdate = req.body;
    await updateServiceOrder(id, serviceOrderUpdate);
    return res.status(200).send();
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const serviceOrderController = {
  handleGetServiceOrdersRequest,
  handleCreateServiceOrderRequest,
  handleUpdateServiceOrderRequest,
};
