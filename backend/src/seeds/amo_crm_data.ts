import type { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../config/.env') });

const tableName: string = 'amo_crm';

export async function seed(knex: Knex): Promise<void> {
    await knex(tableName).insert([
        {
            client_secret: process.env.AMO_CRM_CLIENT_SECRET,
            client_id: process.env.AMO_CRM_CLIENT_ID,
            access_token: process.env.AMO_CRM_ACCESS_TOKEN,
            refresh_token: process.env.AMO_CRM_REFRESH_TOKEN,
            redirect_uri: process.env.AMO_CRM_REDIRECT_URI,
        },
    ]);
}
