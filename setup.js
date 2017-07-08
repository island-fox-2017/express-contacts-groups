var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');
function createTableContact() {
  db.run(`CREATE TABLE IF NOT EXISTS Contact
           (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) , company VARCHAR(255), telp_number VARCHAR(255)  , email VARCHAR(255)) ;`);
  console.log("Table Contact created");
}
function createTableGroup(){
  db.run(`CREATE TABLE IF NOT EXISTS Groups
           (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(255));`);
  console.log('Table Group Created');

}
createTableGroup()
createTableContact()
