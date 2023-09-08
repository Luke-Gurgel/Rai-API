import { categoriesSeeder } from "./materialCategory";
import { inventorySeeder } from "./materialInventory";
import { materialSeeder } from "./material";
import { addressSeeder } from "./address";

const arg = process.argv[2];

if (arg === "down") {
  inventorySeeder
    .undoSeed()
    .then(materialSeeder.undoSeed)
    .then(categoriesSeeder.undoSeed)
    .then(addressSeeder.undoSeed);
} else {
  categoriesSeeder
    .seed()
    .then(materialSeeder.seed)
    .then(inventorySeeder.seed)
    .then(addressSeeder.seed);
}
