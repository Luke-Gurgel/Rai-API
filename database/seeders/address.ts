import { db } from "@/database";
import { Transaction } from "kysely";
import { Database } from "db/types/Database";

const seed = (transaction?: Transaction<Database>) => {
  return (transaction || db)
    .insertInto("address")
    .values([
      {
        addressId: 1,
        clientId: 1,
        street: "Rua Principal",
        number: 123,
        neighborhood: "Bairro Central",
        cep: "41701015",
        city: "Cidade Grande",
        state: "SG",
        complement: "Apartamento 4A",
      },
      {
        addressId: 2,
        clientId: 2,
        street: "Avenida Central",
        number: 456,
        neighborhood: "Bairro Novo",
        cep: "40150140",
        city: "Cidade Pequena",
        state: "SP",
      },
    ])
    .execute();
};

const undoSeed = (transaction?: Transaction<Database>) => {
  return (transaction || db).deleteFrom("address").execute();
};

const arg = process.argv[2];

if (arg === "up") {
  seed();
} else if (arg === "down") {
  undoSeed();
}

export const addressSeeder = { seed, undoSeed };
