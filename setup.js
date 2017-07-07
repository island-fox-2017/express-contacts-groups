let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./db/data.db');

function createContactsTable() {
  db.run(`
    CREATE TABLE Contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255),
      company VARCHAR(255),
      telp_number VARCHAR(255),
      email VARCHAR(255)
    );
  `);
  console.log("kontak");
}

function createGroupsTable() {
  db.run(`
    CREATE TABLE Groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_of_group VARCHAR(255)
    );
  `);
  console.log("grup");
}

function dropTable() {
  db.run(`DROP TABLE Groups`);
  //db.run(`DROP TABLE Contacts`);
}

createContactsTable();
createGroupsTable();
//dropTable();
