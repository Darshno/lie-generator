import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./clicks.db", (err) => {
  if (err) {
    console.error("DB error:", err);
  } else {
    console.log("Database connected");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS clicks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    situation TEXT,
    theme TEXT,
    clicked_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;