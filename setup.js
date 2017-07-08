var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('data.db');

function createTable() {
  db.run(`CREATE TABLE IF NOT EXISTS Contacts
           (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, company text, telp_number text unique, email text unique);`);
  console.log("Table Contacts created..");
  db.run(`CREATE TABLE IF NOT EXISTS Groups
           (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group text unique);`);
  console.log("Table Groups created..");
}

createTable();
