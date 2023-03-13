import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv-flow';
dotenv.config();

const source = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./src/**/**.entity{.ts,.js}'],
  synchronize: true,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  logging: 'all'
});

export default source;
