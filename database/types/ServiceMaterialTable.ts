import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface ServiceMaterialTable {
  serviceMaterialId: Generated<number>;
  serviceId: number;
  materialId: number;
}

export type ServiceMaterial = Selectable<ServiceMaterialTable>;
export type NewServiceMaterial = Insertable<ServiceMaterialTable>;
export type ServiceMaterialUpdate = Updateable<ServiceMaterialTable>;
