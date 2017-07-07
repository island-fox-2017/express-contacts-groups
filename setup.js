'use strict'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');

function createTabel(){
  db.run(`CREATE TABLE IF NOT EXISTS Contacts (
    id INTEGER primary key AUTOINCREMENT,
    name varchar(50),
    company varchar(50),
    telp_number varchar(15),
    email varchar(50)
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS Groups (
    id INTEGER primary key AUTOINCREMENT,
    name_of_group varchar(50)
  );`);
}

function dropTableGroups(){
  db.run(`DROP TABLE Groups`)
}

function dropTableGroups(){
  db.run(`DROP TABLE Contacts`)
}

createTabel();
// dropTableGroups();
// * Contacts: id type integer, name type string, company type string, telp_number type string, email type string
// * Groups: id type integer, name_of_group type string
