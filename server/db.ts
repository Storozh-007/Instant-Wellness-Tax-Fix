
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    subtotal REAL NOT NULL,
    timestamp TEXT NOT NULL,
    composite_tax_rate REAL NOT NULL,
    tax_amount REAL NOT NULL,
    total_amount REAL NOT NULL,
    state_rate REAL NOT NULL,
    county_rate REAL NOT NULL,
    city_rate REAL NOT NULL,
    special_rates REAL NOT NULL,
    jurisdiction_name TEXT NOT NULL
  )
`);

export default db;
