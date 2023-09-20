import { FastifyRequest, FastifyReply } from "fastify";
import {
  CreateServiceSchema,
  UpdateServiceSchema,
} from "@/0_routes/schemas/service";
import {
  getServices,
  createService,
  updateService,
} from "@/2_useCases/serviceUseCases";

const handleGeServicesRequest = async (
  _: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const services = await getServices();
    return res.status(200).send(services);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const handleCreateServiceRequest = async (
  req: FastifyRequest<{ Body: CreateServiceSchema }>,
  res: FastifyReply
) => {
  try {
    const service = req.body;
    const { serviceId } = await createService(service);
    return res.status(201).send({ serviceId });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const handleUpdateServiceRequest = async (
  req: FastifyRequest<{
    Body: UpdateServiceSchema;
    Params: { id: number };
  }>,
  res: FastifyReply
) => {
  try {
    const { id } = req.params;
    const service = req.body;
    await updateService(id, service);
    return res.status(200).send();
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const serviceController = {
  handleGeServicesRequest,
  handleCreateServiceRequest,
  handleUpdateServiceRequest,
};
