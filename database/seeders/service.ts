import { db } from "@/database";
import { Transaction } from "kysely";
import { Database } from "db/types/Database";

const seed = (transaction?: Transaction<Database>) => {
  return (transaction || db)
    .insertInto("service")
    .values([
      { name: "detetização", serviceId: 1 },
      { name: "controle de moscas", serviceId: 2 },
      { name: "manejo de pombos", serviceId: 3 },
      { name: "desratização", serviceId: 4 },
    ])
    .execute();
};

const undoSeed = (transaction?: Transaction<Database>) => {
  return (transaction || db).deleteFrom("service").execute();
};

const arg = process.argv[2];

if (arg === "up") {
  seed();
} else if (arg === "down") {
  undoSeed();
}

export const serviceSeeder = { seed, undoSeed };
