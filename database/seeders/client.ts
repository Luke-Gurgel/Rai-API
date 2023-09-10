import { db } from "@/database";
import { ClientType } from "../types/Client";

const seed = () => {
  return db
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
        cpf: "5340300501",
        email: "luc.gur@gmail.com",
        tel: "71983748585",
        type: ClientType.PF,
      },
    ])
    .execute();
};

const undoSeed = () => {
  return db.deleteFrom("client").execute();
};

const arg = process.argv[2];

if (arg === "up") {
  seed();
} else if (arg === "down") {
  undoSeed();
}

export const clientSeeder = { seed, undoSeed };
