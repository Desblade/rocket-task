import type { Knex } from 'knex';
import { inject, injectable } from 'inversify';
import type { IAmoCrmRepo } from './IAmoCrmRepo';
import type { IAmoCrm } from '../../models/IAmoCrm';
import { errorLogger } from '../../logger';

@injectable()
class AmoCrmRepo implements IAmoCrmRepo{
    private readonly _db: Knex;
    private readonly _tableName: string;

    constructor(@inject('Knex') db: Knex) {
        this._tableName = 'amo_crm';
        this._db = db;
    }

    public async getAmoCrmCred(fields: string[]): Promise<IAmoCrm> {
        try {
            const [amoCrmCred]: IAmoCrm[] = await this._db(this._tableName)
                .select(fields)

            return amoCrmCred;

        } catch (err: any) {
            errorLogger.error(err.message);

            throw err;
        }
    }

    public async updateTokens(accessToken: string, refreshToken: string): Promise<void> {
        try {
            const id: number = 1;

            await this._db(this._tableName)
                .update({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                })
                .where({ id });

        } catch (err: any) {
            errorLogger.error(err.message);

            throw err;
        }
    }
}

export {
    AmoCrmRepo,
};
