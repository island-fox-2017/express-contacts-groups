var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./db/data.db');


let createTable = () => {
  let tableContacts = `CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(140), company VARCHAR(255), telp_number VARCHAR(20), email VARCHAR(140));`;
  
  let tableGroups = `CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(140));`;
  
  db.run(tableContacts);
  db.run(tableGroups);
};

 createTable();