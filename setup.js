'use strict'

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/data.db');


let createContactsTable = () => {
  let contactsTable = `CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), company VARCHAR(20), telp_number VARCHAR(12), email VARCHAR(20));`;
  db.run(contactsTable, function(err) {
    if (!err) console.log('Contacs table created');
    else console.log('Table already defined');
  });
}

let createGroupsTable = () => {
  let groupsTable = `CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(20));`;
  db.run(groupsTable, function(err) {
    if (!err) console.log('Groups table created');
    else console.log('Table already defined');
  });
}


createGroupsTable();
createContactsTable();
