import { db } from "@/database";
import { serviceRepo } from "@/3_repositories/serviceRepo";
import { serviceMaterialRepo } from "@/3_repositories/serviceMaterialRepo";
import {
  CreateServiceSchema,
  UpdateServiceSchema,
  GetServicesResponse,
} from "@/0_routes/schemas/service";

export const getServices = async (): Promise<GetServicesResponse[]> => {
  return await serviceRepo.getAll();
};

export const createService = async (service: CreateServiceSchema) => {
  const { name, materialIds } = service;

  return await db.transaction().execute(async (transaction) => {
    const { serviceId } = await serviceRepo.create({ name }, transaction);
    await serviceMaterialRepo.create(serviceId, materialIds, transaction);
    return { serviceId };
  });
};

export const updateService = async (
  serviceId: number,
  serviceUpdate: UpdateServiceSchema
) => {
  const { name, materialIds } = serviceUpdate;

  return await db.transaction().execute(async (transaction) => {
    await serviceRepo.updateById(serviceId, { name }, transaction);

    if (materialIds) {
      await serviceMaterialRepo.deleteByServiceId(serviceId, transaction);
      await serviceMaterialRepo.create(serviceId, materialIds, transaction);
    }
  });
};
