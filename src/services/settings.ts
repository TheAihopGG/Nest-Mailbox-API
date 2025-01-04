import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';

// init environments parameters
dotenv.config();

interface IPaths {
    /** Contains path to database file*/
    database: string
}

export interface ISettings {
    /** Contains paths to static files*/
    paths: IPaths,
    /** Contains listening ports*/
    port: number,
    /** Session lifetime in seconds */
    sessionLifeTime: number
}

export const settings: ISettings = JSON.parse(
    readFileSync(process.env.APP_SETTINGS_PATH).toString()
);
