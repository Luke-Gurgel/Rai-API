import { Generated, Insertable, Selectable, Updateable } from "kysely";

export enum ClientType {
  PF = "PF",
  PJ = "PJ",
}

export interface ClientTable {
  clientId: Generated<number>;
  tel: string;
  email: string;
  type: ClientType;
  name?: string;
  cpf?: string;
  fantasyName?: string;
  razaoSocial?: string;
  cnpj?: string;
}

export type Client = Selectable<ClientTable>;
export type NewClient = Insertable<ClientTable>;
export type ClientUpdate = Updateable<ClientTable>;
