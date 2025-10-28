import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

// Use environment variables to control sync/migrations and avoid loading
// both .ts and .js entities at the same time (prevents duplicate entity
// registration which can cause "table already exists" errors).
const isProduction = process.env.NODE_ENV === 'production';

const entities = isProduction
  ? [`${__dirname}/../../**/*.ormEntity.js`]
  : [`${__dirname}/../../**/*.ormEntity.ts`];

const migrations = isProduction
  ? [`${__dirname}/../../**/migrations/*.js`]
  : [`${__dirname}/../../**/migrations/*.ts`];

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities,
  migrations,
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
};
