import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/../../**/*.ormEntity{.js,.ts}`],
  migrations: [`${__dirname}/../../**/migrations/*{.js,.ts}`],
  migrationsRun: false, //TODO: passar valor para variável de ambiente
  synchronize: true, //TODO: passar valor para variável de ambiente
};
