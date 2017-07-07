var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./db/contact_group.db');

function createTable(){
  db.run(`CREATE TABLE IF NOT EXISTS Contacts (
    id INTEGER AUTO_INCREMENT, 
    name VARCHAR(50), 
    company VARCHAR(50),
    telp_number VARCHAR(15),
    email VARCHAR(50));`);
  
  db.run(`CREATE TABLE IF NOT EXISTS Groups (
    id INTEGER AUTO_INCREMENT,
    name_of_group VARCHAR(50));`);
};

createTable();
