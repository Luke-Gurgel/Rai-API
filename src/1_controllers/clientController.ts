import { FastifyRequest, FastifyReply } from "fastify";
import { createClient, getClients } from "@/2_useCases/clientUseCases";
import { NewClient } from "db/types/ClientTable";
import { NewAddress } from "db/types/AddressTable";

const handleGeClientsRequest = async (_: FastifyRequest, res: FastifyReply) => {
  try {
    const clients = await getClients();
    return res.status(200).send(clients);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const handleCreateClientRequest = async (
  req: FastifyRequest<{ Body: { client: NewClient; address: NewAddress } }>,
  res: FastifyReply
) => {
  try {
    const { client, address } = req.body;
    const { clientId, addressId } = await createClient(client, address);
    return res.status(201).send({ clientId, addressId });
  } catch (error) {
    return res.status(400).send(error);
  }
};

// const handleUpdateMaterialRequest = async (
//   req: FastifyRequest<{ Body: MaterialUpdate; Params: { id: number } }>,
//   res: FastifyReply
// ) => {
//   try {
//     const { id } = req.params;
//     await updateMaterial(id, req.body);
//     return res.status(200).send();
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// };

export const clientController = {
  handleGeClientsRequest,
  handleCreateClientRequest,
  // handleUpdateMaterialRequest,
};
