const clientSchema = {
  type: "object",
  properties: {
    type: { type: "string", enum: ["PF", "PJ"] },
    tel: { type: "string", minLength: 11, maxLength: 11 },
    email: { type: "string" },
    name: { type: "string" },
    cpf: { type: "string", minLength: 11, maxLength: 11 },
    fantasyName: { type: "string" },
    razaoSocial: { type: "string" },
    cnpj: { type: "string", minLength: 14, maxLength: 14 },
  },
};

const addressSchema = {
  type: "object",
  properties: {
    street: { type: "string" },
    number: { type: "number" },
    neighborhood: { type: "string" },
    cep: { type: "string", minLength: 8, maxLength: 8 },
    city: { type: "string" },
    state: { type: "string", minLength: 2, maxLength: 2 },
    complement: { type: "string" },
  },
};

export const createClientSchema = {
  body: {
    type: "object",
    properties: {
      client: {
        ...clientSchema,
        required: ["type", "email", "tel"],
      },
      address: {
        ...addressSchema,
        required: ["street", "number", "neighborhood", "cep", "city", "state"],
      },
    },
    required: ["client", "address"],
  },
};

export const updateClientSchema = {
  body: {
    type: "object",
    properties: {
      client: clientSchema,
      address: addressSchema,
    },
    required: ["client", "address"],
  },
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
  },
};
