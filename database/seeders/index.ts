import { categoriesSeeder } from "./materialCategories";
import { inventorySeeder } from "./materialInventory";
import { materialSeeder } from "./materials";

const arg = process.argv[2];

if (arg === "down") {
  inventorySeeder
    .undoSeed()
    .then(materialSeeder.undoSeed)
    .then(categoriesSeeder.undoSeed);
} else {
  categoriesSeeder.seed().then(materialSeeder.seed).then(inventorySeeder.seed);
}
