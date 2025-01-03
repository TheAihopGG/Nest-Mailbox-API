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
        paths: IPaths
    }
}
