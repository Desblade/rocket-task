import type { Request, Response, NextFunction } from 'express';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { errorLogger } from '../logger';
import type { IRequestBodyRefreshToken } from '../models/RequestModels/IRequestBodyRefreshToken';
import type { envVariable } from '../types';
import { container } from '../inversify.config';
import type { IAmoCrmRepo } from '../repositories/AmoCrmRepo/IAmoCrmRepo';
import type { IAmoCrm } from '../models/IAmoCrm';

const checkAmoCrmAuth = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
        const baseUri: envVariable = process.env.AMO_CRM_BASE_URI;
        const tokenExpiresIn: number = req.session.tokenExpiresIn
            ? req.session.tokenExpiresIn
            : 0;
        const currentTimeInSeconds: number = Math.floor(new Date().getTime() / 1000);

        if (tokenExpiresIn < currentTimeInSeconds) {
            const amoCrmRepo: IAmoCrmRepo = container.get<IAmoCrmRepo>('AmoCrmRepo');
            const fields: string[] = ['client_id', 'client_secret', 'refresh_token', 'redirect_uri'];
            const amoCrmCred: IAmoCrm = await amoCrmRepo.getAmoCrmCred(fields);

            const requestBodyRefreshToken: IRequestBodyRefreshToken = {
                'grant_type': 'refresh_token',
                'client_id': amoCrmCred.client_id,
                'client_secret': amoCrmCred.client_secret,
                'refresh_token': amoCrmCred.refresh_token,
                'redirect_uri': amoCrmCred.redirect_uri,
            };

            const { data }: AxiosResponse = await axios.post(`${baseUri}/oauth2/access_token`, requestBodyRefreshToken);

            req.session.tokenExpiresIn = (Date.now() / 1000) + data?.expires_in;

            await amoCrmRepo.updateTokens(data.access_token, data.refresh_token);
        }
        return next();

    } catch (err: any) {
        errorLogger.error(err.message);

        return res
            .status(401)
            .json({ message: 'Вы не авторизованы в AmoCRM' });
    }
};

export {
    checkAmoCrmAuth,
};
