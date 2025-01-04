import { readFileSync } from 'fs';
/**
* Contains interfaces for data/appSettings.json. Use ISettings, when you loads settings file.
*/
export namespace SettingsInterfaces {
    /**
    * @param database - contains path to database
    */
    interface IPaths {
        database: string
    }

    /**
    * @param paths - contains paths to static files
    */
    export interface ISettings {
        paths: IPaths,
        ports: number[]
    }
}

/**
 * Returns object implements ISettings
 * 
 * @param path - path to settings file
*/
export function loadSettings(path: string): SettingsInterfaces.ISettings {
    return JSON.parse(
        readFileSync(process.env.APP_SETTINGS_PATH).toString()
    );
}
