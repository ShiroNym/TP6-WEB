import sqlite3 from 'sqlite3';
import { DB_FILE, log } from '../config.mjs';

const db = new sqlite3.Database(DB_FILE);

db.run(`CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT UNIQUE NOT NULL,
  short TEXT UNIQUE NOT NULL
)`);

export function getAllLinks(callback) {
  db.all('SELECT * FROM links', callback);
}

export function addLink(url, callback) {
  db.get('SELECT * FROM links WHERE url = ?', [url], (err, row) => {
    if (err) return callback(err);
    if (row) {
      callback(null, row, true);
      return;
    }
    function tryInsert() {
      const short = generateShortId();
      db.run('INSERT INTO links (url, short) VALUES (?, ?)', [url, short], function(err) {
        if (err && err.code === 'SQLITE_CONSTRAINT') {
          tryInsert();
        } else if (!err) {
          db.get('SELECT * FROM links WHERE url = ?', [url], (getErr, row) => {
            callback(getErr, row, false);
          });
        } else {
          callback(err, null, false);
        }
      });
    }
    tryInsert();
  });
}

export function deleteAllLinks(callback) {
  db.run('DELETE FROM links', callback);
}

export function getLinkByUrl(url, callback) {
  db.get('SELECT * FROM links WHERE url = ?', [url], callback);
}

function generateShortId(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getLinkByShort(short, callback) {
  db.get('SELECT * FROM links WHERE short = ?', [short], callback);
}

export function closeDb() {
  db.close();
}
