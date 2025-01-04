import * as sqlite3 from 'sqlite3';

export function createTables(db: sqlite3.Database) {
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
            toMailbox TEXT,
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
}