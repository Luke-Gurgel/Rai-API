import { db } from "@/database";
import { Transaction } from "kysely";
import { Database } from "db/types/Database";

const seed = (transaction?: Transaction<Database>) => {
  return (transaction || db)
    .insertInto("material_inventory")
    .values([
      {
        inventoryId: 1,
        materialId: 1,
        lote: "USD9d89sa8s",
        price: 40.99,
        expDate: "2030-04-05",
        purchaseDate: "2023-04-05",
        quantity: 10,
      },
      {
        inventoryId: 2,
        materialId: 1,
        lote: "USD84n423n93",
        price: 40.99,
        expDate: "2029-03-05",
        purchaseDate: "2023-03-05",
        quantity: 10,
      },
      {
        inventoryId: 3,
        materialId: 2,
        lote: "NOIFNA0-fdsa0ds",
        price: 5,
        expDate: "2029-03-05",
        purchaseDate: "2023-03-05",
        quantity: 10,
      },
    ])
    .execute();
};

const undoSeed = (transaction?: Transaction<Database>) => {
  return (transaction || db).deleteFrom("material_inventory").execute();
};

const arg = process.argv[2];

if (arg === "up") {
  seed();
} else if (arg === "down") {
  undoSeed();
}

export const inventorySeeder = { seed, undoSeed };
