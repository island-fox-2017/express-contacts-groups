var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("./db/data.db")

function createTable(){
db.run(`CREATE TABLE IF NOT EXISTS Contacts(
  id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT,
  company TEXT, telp_number TEXT, email TEXT );`);
  console.log("Table Contacts Created");

db.run(`CREATE TABLE IF NOT EXISTS Groups(
  id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT);`);
  console.log("Table Groups Created");
}

function insertData(){
  db.run(`INSERT INTO Contacts(nama, company, telp_number, email)
  VALUES('ari','Hacktiv-8','0812344','ari@hacktiv8')`)
  console.log("data created");
}

function deleteData(){
  db.run(`DELETE FROM Contacts WHERE id = 2`)
  console.log("data deleted");
}

function insertDataGroup(){
  db.run(`INSERT INTO Groups(name_of_group)
  VALUES('Hacktiv-8')`)
  console.log("data Group created");
}


// createTable();
// insertData();
// deleteData();
insertDataGroup();
