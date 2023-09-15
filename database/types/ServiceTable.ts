import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface ServiceTable {
  serviceId: Generated<number>;
  name: string;
}

export type Service = Selectable<ServiceTable>;
export type NewService = Insertable<ServiceTable>;
export type ServiceUpdate = Updateable<ServiceTable>;
