import * as sqlite3 from 'sqlite3';
import { settings } from './settings';
import { v4 as uuidv4 } from 'uuid';

// open database
export const db = new sqlite3.Database(
    settings.paths.database,
    sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE
);
console.debug('Database opened');

export const actions = {
    messageSended: 'messageSended',
    sessionCreated: 'sessionCreated',
    mailboxCreated: 'mailboxCreated'
};

export namespace SQL {
    /**
     * Inserts mailbox into mailboxes and inserts log into logs
     * 
     * @param name 
     * @param password 
     */
    export function insertMailbox(
        name: string,
        password: string
    ) {
        const mailboxId = uuidv4();
        db.run(
            `INSERT OR REPLACE INTO mailboxes (id, name, password, createdDate) VALUES (?, ?, ?, ?)`,
            [
                mailboxId,
                name,
                password,
                Date.now()
            ]
        );
        insertLog(
            actions.mailboxCreated,
            { mailboxId: mailboxId }
        );
    }

    /**
     * Inserts log into logs
     * 
     * @param actionName - one of database.actions
     * @param params - action params object
     */
    export function insertLog(
        actionName: string,
        params: Object
    ) {
        if (actionName in actions) {
            db.run(
                `INSERT OR REPLACE INTO logs (id, actionName, params, actionDate) VALUES (?, ?, ?, ?)`,
                [
                    uuidv4(),
                    actionName,
                    params,
                    Date.now()
                ]
            );
        }
        else {
            throw new Error(`Unknown action "${actionName}"`);
        }
    }

    /**
     * Inserts message into messages and inserts log into logs
     * 
     * @param mailboxId - message receiver
     * @param content 
     * @param fromMailbox - message sender id
     */
    export function insertMessage(
        mailboxId: string,
        content: string,
        fromMailbox: string,
    ) {
        const messageId = uuidv4();
        db.run(
            `INSERT OR REPLACE INTO messages (id, mailboxId, content, fromMailbox, sendedDate) VALUES (?, ?, ?, ?, ?)`,
            [
                messageId,
                mailboxId,
                content,
                fromMailbox,
                Date.now()
            ]
        );
        insertLog(
            actions.messageSended,
            { sessionId: messageId }
        );
    }

    /**
     * Inserts session into sessions and inserts log into logs
     * 
     * @param mailboxId
     */
    export function insertSession(mailboxId: string) {
        const sessionId = uuidv4();
        db.run(
            `INSERT OR REPLACE INTO session (id, mailboxId, expireDate) VALUES (?, ?, ?)`,
            [
                sessionId,
                mailboxId,
                Date.now() + settings.sessionLifeTime
            ]
        );
        insertLog(
            actions.sessionCreated,
            { sessionId: sessionId }
        );
    }

    /**
     * Creates tables in database
     */
    export function createTables() {
        db.run(`
        CREATE TABLE IF NOT EXISTS mailboxes (
            id TEXT PRIMARY KEY,
            name TEXT UNIQUE,
            password TEXT,
            createdDate INTEGER
        );
        CREATE TABLE IF NOT EXISTS messages (
            id TEXT PRIMARY KEY,
            mailboxId TEXT,
            content TEXT,
            fromMailbox TEXT,
            sendedDate INTEGER,
            FOREIGN KEY (mailboxId, fromMailbox, toMailbox) REFERENCES mailboxes(id, name, name) 
        );
        CREATE TABLE IF NOT EXISTS logs (
            id TEXT PRIMARY KEY,
            actionName TEXT,
            params JSON DEFAULT [],
            actionDate INTEGER
        );
        CREATE TABLE IF NOT EXISTS sessions (
            id TEXT PRIMARY KEY,
            mailboxId TEXT,
            expireDate INTEGER
        );
    `);
        console.debug('Tables created');
    }
}