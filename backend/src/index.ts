import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import type { Express } from 'express';
import path from 'path';
import cors from 'cors';
import { router } from './routers';
import { infoLogger, errorLogger } from './logger';
import type { envVariable } from './types';

declare module 'express-session' {
    interface SessionData {
        tokenExpiresIn: number,
    }
}

dotenv.config({ path: path.resolve(__dirname, '../config/.env') });

const port: envVariable = process.env.PORT;

const app: Express = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/api', router);

(function start(): void {
    try {
        app.listen(port, (): void => {
            infoLogger.info(`web server was started on http://localhost:${port}`);
        });
    } catch (err: any) {
        errorLogger.error(err.message);
    }
})();
