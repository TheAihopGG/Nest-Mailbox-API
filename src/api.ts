import * as dotenv from 'dotenv';
import { loadSettings } from './services/settings';
import * as sqlite3 from 'sqlite3';

// init environments parameters
dotenv.config();
// load settings
const settings = loadSettings(process.env.APP_SETTINGS_PATH);
// open database
const db = new sqlite3.Database(
    settings.paths.database,
    sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE
);
console.debug('Database opened');

// enable graceful stop
process.once('beforeExit', () => {
    db.close();
    console.debug('Database closed');
});
