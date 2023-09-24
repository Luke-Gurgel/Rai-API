export interface CreateServiceSchema {
  name: string;
  materialIds: number[];
}

export interface GetServicesResponse extends CreateServiceSchema {
  serviceId: number;
}

export type UpdateServiceSchema = Partial<CreateServiceSchema>;

const serviceSchema = {
  name: { type: "string" },
  materialIds: {
    type: "array",
    items: { type: "integer" },
  },
};

export const createServiceSchema = {
  body: {
    type: "object",
    properties: { ...serviceSchema },
    required: ["name", "materialIds"],
  },
};

export const updateServiceSchema = {
  body: {
    type: "object",
    properties: { ...serviceSchema },
  },
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
  },
};
