var sqlite3 = require ('sqlite3').verbose();
var db = new sqlite3.Database('./db/data1.db');

function buatTabel() {

  db.run(`CREATE TABLE IF NOT EXISTS Contacts
    (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,
      company TEXT, telp_number TEXT, email TEXT);`)

  db.run(`CREATE TABLE IF NOT EXISTS Groups
    (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT);`)

    console.log("Buat tabel nih!!");
}

function insertData() {

  db.run(`INSERT INTO Contacts(name, company, telp_number, email)
  VALUES ('uhuy','inigurp','08569781907','sayyaf@uhuy.com');`)

  db.run(`INSERT INTO Groups(name_of_group)
  VALUES ('kalengabret Group');`)

  console.log("Buat InsertDATA nih!!!");
}



// deleteData()
// buatTabel()
// insertData()
