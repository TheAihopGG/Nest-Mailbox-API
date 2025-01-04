import * as dotenv from 'dotenv';
import * as express from 'express';
import { settings } from './services/settings';
import * as database from './services/database';
import { bindUrls } from './services/urls';

// init environments parameters
dotenv.config();
// create app
const app = express();

// init database
database.SQL.createTables();

// bind urls to app
bindUrls(app);

// enable graceful stop
process.once('beforeExit', () => {
    database.db.close();
    console.debug('Database closed');
});

// launch app
console.debug(`Listening port ${settings.port}`);
app.listen(settings.port);
