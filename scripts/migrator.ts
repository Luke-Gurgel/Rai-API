import { Migrator, FileMigrationProvider } from "kysely";
import { promises as fs } from "fs";
import { db } from "@/database";
import path from "path";

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.resolve(__dirname, "../database/migrations"),
  }),
});

enum Arg {
  UP = "up",
  DOWN = "down",
}

const arg = process.argv[2] as Arg;

if (!arg) {
  migrator
    .migrateToLatest()
    .then(({ results }) => {
      results?.length
        ? console.log("MIGRATIONS >>>>>>", results)
        : console.log("###### DB is up to date, no migrations executed ######");
    })
    .catch((e) => console.log("ERROR MIGRATING TO LATEST >>>>", e));
} else if (arg === Arg.UP) {
  migrator
    .migrateUp()
    .then(({ results }) => {
      results?.length
        ? console.log("MIGRATION >>>>>>", results)
        : console.log("###### DB is up to date, no migrations executed ######");
    })
    .catch((e) => console.log("ERROR RUNNING NEXT MIGRATION >>>>", e));
} else if (arg === Arg.DOWN) {
  migrator
    .migrateDown()
    .then(({ results }) => console.log("MIGRATION >>>>>>", results))
    .catch((e) => console.log("ERROR UNDOING LAST MIGRATION >>>>", e));
}
