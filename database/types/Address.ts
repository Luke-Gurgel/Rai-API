import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface AddressTable {
  addressId: Generated<number>;
  clientId: number;
  street: string;
  number: number;
  neighborhood: string;
  cep: string;
  city: string;
  state: string;
  complement?: string;
}

export type Address = Selectable<AddressTable>;
export type NewAddress = Insertable<AddressTable>;
export type AddressUpdate = Updateable<AddressTable>;
