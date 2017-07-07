const sqlite3 = require('sqlite3').verbose();


var db = new sqlite3.Database('./db/contact_group.db');


function craeteTable(){
  
db.run(`create table if not exists Contacts (id integer primary key autoincrement, name varchar(255), company varchar(255), telp_number varchar(255), email varchar(255))`);
console.log(`tabel Contact berhasil dibuat`);

db.run(`create table if not exists Groups (id integer primary key autoincrement, name_of_group varchar(255))`);
console.log(`tabel Groups berhasil dibuat`);

}


craeteTable()
