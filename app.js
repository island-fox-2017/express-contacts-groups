'use strict'

const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/data.db');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


// GET
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/contacts', function(req, res) {
  db.all(`SELECT * FROM contacts;`, function(err, rows) {
    if (!err) res.render('contacts', {data: rows});
    else console.log(err);
  })
});

app.get('/contacts/edit/:id', function(req, res) {
  res.render('editcontacts', {contact_id: req.params.id});
})

app.get('/contacts/delete/:id', function(req, res) {
  db.run(`DELETE FROM contacts WHERE id = ${req.params.id};`, function(err, rows) {
    if (!err) res.send(`Contacts dengan ID : ${req.params.id} berhasil dihapus`);
    else console.log(err);
  })
});

app.get('/groups', function(req,res) {
  db.all(`SELECT * FROM groups;`, function(err, rows) {
    if (!err) res.render('groups', {data: rows});
    else console.log(err);
  })
});

app.get('/groups/edit/:id', function(req, res) {
  res.render('editgroups', {group_id: req.params.id});
})

app.get('/groups/delete/:id', function(req, res) {
  db.run(`DELETE FROM groups WHERE id = ${req.params.id};`, function(err, rows) {
    if (!err) res.send(`Group dengan ID : ${req.params.id} berhasil dihapus`);
    else console.log(err);
  })
});


// POST
app.post('/contacts', function(req, res) {
  db.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}');`, function(err) {
    if (!err) res.redirect('contacts');
    else console.log(err);
  })
});

app.post('/contacts/edit/:id', function(req, res) {
  db.run(`UPDATE contacts SET name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id = ${req.params.id};`, function(err) {
    if (!err) res.redirect('/contacts');
    else console.log(err);
  })
})

app.post('/groups', function(req, res) {
  db.run(`INSERT INTO groups (name_of_group) VALUES ('${req.body.name_of_group}');`, function(err) {
    if (!err) res.redirect('groups');
    else console.log(err);
  })
})

app.post('/groups/edit/:id', function(req, res) {
  db.run(`UPDATE groups SET name_of_group = '${req.body.name_of_group}' WHERE id = ${req.params.id};`, function(err) {
    if (!err) res.redirect('/groups');
    else console.log(err);
  })
})

app.listen(3000);
console.log('listening...');
