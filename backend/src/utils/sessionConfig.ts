import type { SessionOptions } from 'express-session';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../config/.env') });
const sessionTimeLife: number = 20 * 60 * 1000;

const sessionConfig: SessionOptions = {
    secret: process.env.SESSION_KEY || '',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: sessionTimeLife,
    },
};

export {
    sessionConfig,
};
