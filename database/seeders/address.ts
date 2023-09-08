import { db } from "@/database";

const seed = () => {
  return db
    .insertInto("address")
    .values([
      {
        addressId: 1,
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
        street: "Avenida Central",
        number: 456,
        neighborhood: "Bairro Novo",
        cep: "40150140",
        city: "Cidade Pequena",
        state: "SP",
      },
      {
        addressId: 3,
        street: "Rua das Flores",
        number: 789,
        neighborhood: "Bairro Colorido",
        cep: "41250587",
        city: "Cidade Alegre",
        state: "CA",
        complement: "Casa Amarela",
      },
    ])
    .execute();
};

const undoSeed = () => {
  return db.deleteFrom("address").execute();
};

const arg = process.argv[2];

if (arg === "up") {
  seed();
} else if (arg === "down") {
  undoSeed();
}

export const addressSeeder = { seed, undoSeed };
