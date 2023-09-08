import { db } from "@/database";

const seed = () => {
  return db
    .insertInto("material")
    .values([
      {
        materialId: 1,
        categoryId: 1,
        name: "Placa Cola",
        grupoQuimico: "Toxico",
        principioAtivo: "Toxico",
        minQuantity: 15,
      },
      {
        materialId: 2,
        categoryId: 1,
        name: "Ratoeira",
        grupoQuimico: "N/A",
        principioAtivo: "N/A",
        minQuantity: 30,
      },
      {
        materialId: 3,
        categoryId: 2,
        name: "Veneno de Barata",
        grupoQuimico: "Toxico",
        principioAtivo: "Toxico",
        minQuantity: 10,
      },
    ])
    .execute();
};

const undoSeed = () => {
  return db.deleteFrom("material").execute();
};

const arg = process.argv[2];

if (arg === "up") {
  seed();
} else if (arg === "down") {
  undoSeed();
}

export const materialSeeder = { seed, undoSeed };
