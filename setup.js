var Sqlite3 = require('sqlite3').verbose();
var db = new Sqlite3.Database('db/data.db');

function createTableContacts() {
  db.run("CREATE TABLE if not exists contacts (id INTEGER primary key AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT);");
  console.log("Table created");
}
//
function createTableGroups() {
  db.run("CREATE TABLE if not exists groups (id INTEGER primary key AUTOINCREMENT, name_group TEXT);");
  console.log("Table created");
}

createTableContacts();
createTableGroups();
