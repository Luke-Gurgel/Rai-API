import { db } from "@/database";
import { Transaction } from "kysely";
import { Database } from "db/types/Database";

const seed = (transaction?: Transaction<Database>) => {
  return (transaction || db)
    .insertInto("service_order")
    .values([
      {
        serviceOrderId: 1,
        serviceId: 1,
        clientId: 1,
        dateTime: 1695922200000,
        warranty: 90,
        additionalInfo: "Panqueca",
      },
      {
        serviceOrderId: 2,
        serviceId: 2,
        clientId: 2,
        dateTime: 1695731400000,
        warranty: 90,
        additionalInfo: "Comer bolo",
      },
      {
        serviceOrderId: 3,
        serviceId: 3,
        clientId: 2,
        dateTime: 1696336200000,
        warranty: 90,
      },
      {
        serviceOrderId: 4,
        serviceId: 4,
        clientId: 1,
        dateTime: 1696339800000,
        warranty: 90,
        additionalInfo: "Levar bolo",
      },
    ])
    .execute();
};

const undoSeed = (transaction?: Transaction<Database>) => {
  return (transaction || db).deleteFrom("service_order").execute();
};

const arg = process.argv[2];

if (arg === "up") {
  seed();
} else if (arg === "down") {
  undoSeed();
}

export const serviceOrderSeeder = { seed, undoSeed };
