import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface ServiceOrderTable {
  serviceOrderId: Generated<number>;
  serviceId: number;
  clientId: number;
  warranty: number;
  dateTime: ColumnType<Date, number>;
  additionalInfo?: string;
}

export type ServiceOrder = Selectable<ServiceOrderTable>;
export type NewServiceOrder = Insertable<ServiceOrderTable>;
export type ServiceOrderUpdate = Updateable<ServiceOrderTable>;
