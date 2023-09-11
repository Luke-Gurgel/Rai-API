import { FastifyRequest, FastifyReply } from "fastify";
import { NewClient, ClientUpdate } from "db/types/ClientTable";
import { NewAddress, AddressUpdate } from "db/types/AddressTable";
import {
  getClients,
  createClient,
  updateClient,
} from "@/2_useCases/clientUseCases";

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

const handleUpdateClientRequest = async (
  req: FastifyRequest<{
    Body: { client: ClientUpdate; address: AddressUpdate };
    Params: { id: number };
  }>,
  res: FastifyReply
) => {
  try {
    const { id } = req.params;
    const { client, address } = req.body;
    await updateClient(id, client, address);
    return res.status(200).send();
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const clientController = {
  handleGeClientsRequest,
  handleCreateClientRequest,
  handleUpdateClientRequest,
};
