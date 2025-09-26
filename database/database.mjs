import sqlite3 from 'sqlite3';
import { DB_FILE, log } from '../config.mjs';

const db = new sqlite3.Database(DB_FILE);

const init = () => {
  db.run(`CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT UNIQUE NOT NULL
  )`);
};

init();

export function getAllLinks(callback) {
  db.all('SELECT * FROM links', callback);
}

export function addLink(url, callback) {
  db.run('INSERT INTO links (url) VALUES (?)', [url], function(err) {
    callback(err, { id: this.lastID, url });
  });
}

export function getLinkByUrl(url, callback) {
  db.get('SELECT * FROM links WHERE url = ?', [url], callback);
}

export function closeDb() {
  db.close();
}
