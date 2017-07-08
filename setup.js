'use strict'

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database/data.db')

function createTable() {
  db.run(`CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) , company VARCHAR(255), phone_num VARCHAR(255)  , email VARCHAR(255));`)
  db.run(`CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(255));`)
}

createTable()
