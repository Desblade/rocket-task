import { createLogger, transports, format } from 'winston';
import type { Logger } from 'winston';
import fs from 'fs';
import path from 'path';

const logDirectory: string = path.join(__dirname, 'logs');

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const infoLogger: Logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json(),
    ),
    transports: [
        new transports.File({ filename: path.join(logDirectory, 'info.log'), level: 'info' }),
    ],
});

const errorLogger: Logger  = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp(),
        format.json(),
    ),
    transports: [
        new transports.File({ filename: path.join(logDirectory, 'errors.log'), level: 'error' }),
    ],
});

export {
    infoLogger,
    errorLogger
};
