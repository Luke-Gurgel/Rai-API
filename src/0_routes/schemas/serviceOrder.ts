const serviceOrderSchema = {
  serviceId: { type: "number" },
  clientId: { type: "number" },
  warranty: { type: "number" },
  dateTime: { type: "number" },
  additionalInfo: { type: "string" },
};

export const createServiceOrderSchema = {
  body: {
    type: "object",
    properties: { ...serviceOrderSchema },
    required: ["serviceId", "clientId", "warranty", "dateTime"],
  },
};

export const updateServiceOrderSchema = {
  body: {
    type: "object",
    properties: { ...serviceOrderSchema },
  },
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
  },
};
