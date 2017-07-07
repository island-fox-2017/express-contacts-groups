var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./db/contacts.db');

function createTable () {
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            company TEXT, 
            telp_number TEXT, 
            email TEXT)` 
          ); 
  console.log('TABLE contacts SUCCESFULLY CREATED');
  
  db.run(`CREATE TABLE IF NOT EXISTS groups (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name_of_group TEXT)`
          );
  console.log('TABLE groups SUCCESFULLY CREATED');
          
}

createTable()