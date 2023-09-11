import { db } from "@/database";
import { clientRepo } from "@/3_repositories/clientRepo";
import { addressRepo } from "@/3_repositories/addressRepo";
import { NewClient, ClientUpdate } from "db/types/ClientTable";
import { AddressUpdate, NewAddress } from "db/types/AddressTable";

export const getClients = async () => {
  return await clientRepo.getAll();
};

export const createClient = async (client: NewClient, address: NewAddress) => {
  return await db.transaction().execute(async (transaction) => {
    const { clientId } = await clientRepo.create(client, transaction);
    const { addressId } = await addressRepo.create(
      { ...address, clientId },
      transaction
    );
    return { clientId, addressId };
  });
};

export const updateClient = async (
  clientId: number,
  clientUpdate: ClientUpdate,
  addressUpdate: AddressUpdate
) => {
  return await db.transaction().execute(async (transaction) => {
    await clientRepo.updateById(clientId, clientUpdate, transaction);
    await addressRepo.updateByClientId(clientId, addressUpdate, transaction);
  });
};
