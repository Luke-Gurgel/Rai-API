import { db } from "@/database";
import { Transaction } from "kysely";
import { Database } from "db/types/Database";
import { ClientType } from "../types/ClientTable";

const seed = (transaction?: Transaction<Database>) => {
  return (transaction || db)
    .insertInto("client")
    .values([
      {
        clientId: 1,
        cnpj: "42266543000943",
        fantasyName: "LGA Tech",
        razaoSocial: "Lucas Gurgel",
        email: "lga.tech@gmail.com",
        tel: "71992837475",
        type: ClientType.PJ,
      },
      {
        clientId: 2,
        name: "Lucas",
        cpf: "05340300501",
        email: "luc.gur@gmail.com",
        tel: "71983748585",
        type: ClientType.PF,
      },
    ])
    .execute();
};

const undoSeed = (transaction?: Transaction<Database>) => {
  return (transaction || db).deleteFrom("client").execute();
};

const arg = process.argv[2];

if (arg === "up") {
  seed();
} else if (arg === "down") {
  undoSeed();
}

export const clientSeeder = { seed, undoSeed };
