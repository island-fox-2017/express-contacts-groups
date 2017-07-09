'use strict'

const express = require('express');
const sqlite = require('sqlite3');
const bodyParser = require('body-parser');

var db = new sqlite.Database('./data/data.db');

const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.render('main')
})

app.get('/contacts', function(req, res) {
  db.all('SELECT * FROM Contacts', function(err, result){
    res.render('contacts', {data: result})
  });
})

app.post('/contacts', function(req, res){
  db.run(`INSERT INTO Contacts (id, nama, Company, num_telp, email) VALUES ('${req.body.id}',  '${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`);
  res.redirect('/contacts');
})

app.get('/contacts/edit/:id', function(req, res) {
  db.all(`SELECT * FROM Data_Contacts WHERE id = "${req.params.id}"`, function(err, db_contacts) {
    res.render('edit', {data: db_contacts})
  })
})

app.post('/contacts/edit/:id', function(req, res) {
  db.run(`UPDATE Contacts SET nama = '${req.body.name}', Company = '${req.body.Company}', num_telp = '${req.body.num_telp}', email = '${req.body.email}'WHERE id = ${req.params.id}`);
  res.redirect('/contacts');
})

app.post('/contacts/delete', function(req, res) {
  db.run(`DELETE FROM Contacts nama = '${req.body.name}', Company = '${req.body.Company}', num_telp = '${req.body.num_telp}', email = '${req.body.email}' WHERE id = ${req.params.id}`);
  res.redirect('/contacts');
})

app.listen(3003)
