var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

function createTableContacts() {
  db.run(`CREATE TABLE IF NOT EXISTS contacts
        (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT);`);

  console.log("Table contacts created");

  db.run(`CREATE TABLE IF NOT EXISTS groups
          (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT);`);

  console.log("Table groups created");
}

// function createTableGroups() {
//
// }


createTableContacts()
