var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./db/contact_group.db');

function createTable(){
  db.run(`CREATE TABLE IF NOT EXISTS Contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name VARCHAR(50), 
    company VARCHAR(50),
    telp_number VARCHAR(15),
    email VARCHAR(50));`);
  
  db.run(`CREATE TABLE IF NOT EXISTS Groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_of_group VARCHAR(50));`);
};

function insertData() {
  db.run(`INSERT INTO Contacts(name, company, telp_number, email) VALUES ('teza', 'harsony', '081345678910', 'tezaharsony@gmail.com');`)
}

function insertDataGroup(){
  db.run(`INSERT INTO Groups(name_of_group) VALUES ('facebook developer circle')`)
}

// insertDataGroup();
// createTable();
// insertData()
