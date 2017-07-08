'use strict'

const sqlite = require('sqlite3');
const db = new sqlite.Database('./Data/data.db');

function createTableContacts() {
  db.run(" CREATE TABLE IF NOT EXISTS Contacts(id INTEGER, nama TEXT, Company TEXT, num_telp INTEGER, email TEXT)");
  console.log("Table Created Contacts");
}

function createTableGroups() {
  db.run(" CREATE TABLE IF NOT EXISTS Groups(id INTEGER, nama_of_groups TEXT)");
  console.log("Table Created Groups");
}

createTableContacts();
createTableGroups()
