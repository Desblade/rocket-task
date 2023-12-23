import type { IAmoCrm } from '../../models/IAmoCrm';

interface IAmoCrmRepo {
    getAmoCrmCred(fields: string[]): Promise<IAmoCrm>;
    updateTokens(accessToken: string, refreshToken: string): Promise<void>;
}

export {
    IAmoCrmRepo,
};
