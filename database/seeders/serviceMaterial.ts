import { db } from "@/database";
import { Transaction } from "kysely";
import { Database } from "db/types/Database";

const seed = (transaction?: Transaction<Database>) => {
  return (transaction || db)
    .insertInto("service_material")
    .values([
      { materialId: 3, serviceId: 1, serviceMaterialId: 1 },
      { materialId: 2, serviceId: 2, serviceMaterialId: 2 },
      { materialId: 2, serviceId: 3, serviceMaterialId: 3 },
      { materialId: 1, serviceId: 4, serviceMaterialId: 4 },
      { materialId: 2, serviceId: 4, serviceMaterialId: 5 },
    ])
    .execute();
};

const undoSeed = (transaction?: Transaction<Database>) => {
  return (transaction || db).deleteFrom("service_material").execute();
};

const arg = process.argv[2];

if (arg === "up") {
  seed();
} else if (arg === "down") {
  undoSeed();
}

export const serviceMaterialSeeder = { seed, undoSeed };
