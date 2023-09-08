import { db } from "@/database";

const seed = () => {
  return db
    .insertInto("material_category")
    .values([
      { name: "RATO", categoryId: 1 },
      { name: "INSETO", categoryId: 2 },
      { name: "MATO", categoryId: 3 },
    ])
    .execute();
};

const undoSeed = () => {
  return db.deleteFrom("material_category").execute();
};

export const categoriesSeeder = { seed, undoSeed };
