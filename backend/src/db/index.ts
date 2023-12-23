import knex from 'knex';
import type { Knex } from 'knex';
import knexfile from '../knexfile';

const db: Knex = knex(knexfile.development);

export {
    db,
};
