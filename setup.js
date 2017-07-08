var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

// function createTable () {
//   db.run(`CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, company text, telp_number int, email text);`);
//   console.log('table Contacts created');
//   db.run(`CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group text);`);
//   console.log('table Groups created');
// }
//
// createTable()
