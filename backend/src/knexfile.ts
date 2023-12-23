import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config({ path: '../config/.env' });

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      port: 5432,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    pool: {
      min: 2,
      max: 10
    },
  }
};

export default config;
