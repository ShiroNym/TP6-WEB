import dotenv from 'dotenv';
dotenv.config();

export const ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 8080;
export const DB_FILE = process.env.DB_FILE || 'database/database.sqlite';
export const LOG_LEVEL = process.env.LOG_LEVEL || (ENV === 'production' ? 'warn' : 'debug');

export function log(level, ...args) {
  if (LOG_LEVEL === 'debug' || (LOG_LEVEL === 'warn' && level !== 'debug')) {
    console[level](...args);
  }
}
