import * as dotenv from 'dotenv';
import * as sqlite3 from 'sqlite3';
import * as express from 'express';
import { loadSettings } from './services/settings';
import { createTables } from './services/database';
import { request } from 'http';

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
// create app
const app = express();

// init database
createTables(db);
console.debug('Tables created');

// test
app.get('/', (request, response) => {
    response.send('<h1>Hello</h1>');
});

// enable graceful stop
process.once('beforeExit', () => {
    db.close();
    console.debug('Database closed');
});

// launch app
console.debug(`Listening port ${settings.port}`);
app.listen(settings.port);
