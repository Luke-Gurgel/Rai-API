import { db } from "@/database";
import { categoriesSeeder } from "./materialCategory";
import { inventorySeeder } from "./materialInventory";
import { materialSeeder } from "./material";
import { addressSeeder } from "./address";
import { clientSeeder } from "./client";
import { serviceSeeder } from "./service";
import { serviceMaterialSeeder } from "./serviceMaterial";
import { serviceOrderSeeder } from "./serviceOrder";

const arg = process.argv[2];

if (arg === "down") {
  db.transaction().execute(async (trx) => {
    await inventorySeeder.undoSeed(trx);
    await materialSeeder.undoSeed(trx);
    await categoriesSeeder.undoSeed(trx);
    await clientSeeder.undoSeed(trx);
    await addressSeeder.undoSeed(trx);
    await serviceSeeder.undoSeed(trx);
    await serviceMaterialSeeder.undoSeed(trx);
    await serviceOrderSeeder.undoSeed(trx);
  });
} else {
  db.transaction().execute(async (trx) => {
    await categoriesSeeder.seed(trx);
    await materialSeeder.seed(trx);
    await inventorySeeder.seed(trx);
    await clientSeeder.seed(trx);
    await addressSeeder.seed(trx);
    await serviceSeeder.seed(trx);
    await serviceMaterialSeeder.seed(trx);
    await serviceOrderSeeder.seed(trx);
  });
}
