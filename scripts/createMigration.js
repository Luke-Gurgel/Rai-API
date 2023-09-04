const fs = require('fs');
const path = require('path');

const argument = process.argv[2];

if (!argument) {
  console.error('Please provide a name for the migration file.');
  process.exit(1);
}

const currentDate = new Date().toISOString().replace(/[^0-9]/g, '');
const migrationFileName = `${currentDate}-${argument}.ts`;

const migrationTemplate = `import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}
`;

const migrationFilePath = path.join(__dirname, '../database/migrations', migrationFileName);

fs.writeFile(migrationFilePath, migrationTemplate, (err) => {
  if (err) {
    console.error('Error creating migration file:', err);
    process.exit(1);
  }
  console.log(`Migration file created: ${migrationFileName}`);
});
