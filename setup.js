var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/database.db')


function createTable() {
  db.run(`CREATE TABLE IF NOT EXISTS Data_Contact(id INTEGER primary key AUTOINCREMENT, name text, company text, telp_number INTEGER, email text);`)

}
// console.log("tabel terbuat");
console.log(createTable());

function createTable2() {
  db.run(`CREATE TABLE IF NOT EXISTS Data_Groups(id INTEGER primary key AUTOINCREMENT, groups text)`)
}
console.log(createTable2());
