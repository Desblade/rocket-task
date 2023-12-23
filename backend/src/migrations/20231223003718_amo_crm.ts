import type { Knex } from 'knex';

const tableName: string = 'amo_crm';

export function up(knex: Knex) {
    return knex.schema.createTable(tableName, (table) => {
        table
            .increments('id');
        table
            .string('refresh_token', 1000)
            .notNullable();
        table
            .string('access_token', 1000)
            .notNullable();
        table
            .string('client_id')
            .notNullable()
        table
            .string('client_secret')
            .notNullable()
        table
            .string('redirect_uri')
        table
            .timestamps(true, true);
    });
}


export function down(knex: Knex) {
    return knex.schema.dropTable('amo_crm');
}
