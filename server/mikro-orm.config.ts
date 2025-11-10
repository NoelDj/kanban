
import { defineConfig } from '@mikro-orm/sqlite';
import entities from './src/entities/All.ts'


const ormConfig = defineConfig({
  entities: entities,
  dbName: './src/db.sqlite3',
  debug: true,
});

export default ormConfig;