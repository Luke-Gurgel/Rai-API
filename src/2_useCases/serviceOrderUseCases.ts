import { addMonths } from "date-fns";
import { serviceOrderRepo } from "@/3_repositories/serviceOrderRepo";
import {
  NewServiceOrder,
  ServiceOrderUpdate,
} from "db/types/ServiceOrderTable";

export const getServiceOrders = async (month: number, year: number) => {
  const fromDate = new Date(year, month - 1, 1);
  const toDate = addMonths(fromDate, 1);
  return await serviceOrderRepo.getByPeriod(fromDate, toDate);
};

export const createServiceOrder = async (serviceOrder: NewServiceOrder) => {
  return await serviceOrderRepo.create(serviceOrder);
};

export const updateServiceOrder = async (
  id: number,
  update: ServiceOrderUpdate
) => {
  return await serviceOrderRepo.updateById(id, update);
};
