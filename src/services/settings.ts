import { readFileSync } from 'fs';
/**
* Contains interfaces for data/appSettings.json. Use ISettings, when you loads settings file.
*/
export namespace SettingsInterfaces {
    interface IPaths {
        /** Contains path to database file*/
        database: string
    }

    export interface ISettings {
        /** Contains paths to static files*/
        paths: IPaths,
        /** Contains listening ports*/
        port: number
    }
}

/**
 * Returns object implements ISettings
 * 
 * @param path - path to settings file
*/
export function loadSettings(path: string = process.env.APP_SETTINGS_PATH): SettingsInterfaces.ISettings {
    return JSON.parse(
        readFileSync(path).toString()
    );
}
