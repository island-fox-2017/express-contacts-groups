/**
/** EXPRESS CONTACTS-GROUPS
---------------------------
Buatlah sebuah aplikasi sederhana menggunakan Express JS dan SQLITE3 untuk
menampilkan list Contact&Group, menambah data Contact&Group,
melakukan edit data dan delete data berdasarkan data yang dipilih

- Release 0
1. Buatlah file dengan nama setup.js yang akan dijalankan pertama kali untuk membuat
table pada database. Tentukan column mana saja yang akan di set unique.
2. Berikan validasi di setiap create table sehingga meskipun setup dijalankan berulang
kali, tidak error

Structure table:
* Contacts: id type integer, name type string, company type string, telp_number type string, email type string
* Groups: id type integer, name_of_group type string

- Release 1 - Basic Routing for Contacts dan Groups
Buatlah sejumlah route berikut dan tampilkan melalui view engine ejs
----------------------------------------------------------------------
METHOD | ROUTE                | KETERANGAN
----------------------------------------------------------------------
GET    | /contacts            | Menampilkan semua data contacts
POST   | /contacts            | Menerima data form untuk input contact
GET    | /contacts/edit/:id   | Menampilkan data contact spesifik untuk diubah
POST   | /contacts/edit/:id   | Menerima data form untuk update contact
GET    | /contacts/delete/:id | Menghapus data contact berdasarkan id
GET    | /groups              | Menampilkan semua data groups
POST   | /groups              | Menerima data form untuk input group
GET    | /groups/edit/:id     | Menampilkan data group spesifik untuk diubah
POST   | /groups/edit/:id     | Menerima data form untuk update group
GET    | /groups/delete/:id   | Menghapus data group berdasarkan id

- Release 2
  AKAN DIBERITAHUKAN SETELAH LECTURE SIANG
**/


'use strict'
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');
const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.send('welcome')
})



//ROUTING TABLE Contacts
app.get('/contacts', function(req, res){
  db.all(`SELECT * FROM Contacts`, function(err, rows) {
    if(!err) {
      res.render('contacts', {data: rows});
    }
  })
})

app.post('/contacts', function(req, res){
  let data = req.body;
  insertDataContact(data);

  res.redirect('/contacts');
})

app.get('/contacts/edit/:id', function(req, res, next){
  db.all(`SELECT * FROM contacts WHERE id = '${req.params.id}'`, function(err, rows) {
    if(!err) {
      res.render('edit', {data: rows});
    }
  })
})

app.get('/contacts/delete/:id', function(req, res, next){
    deleteDataContacs(req.params.id);
    res.redirect('/contacts');
})

app.post('/contacts/update/:id', function(req, res, next){
  let data = req.body;
  updateDataContact(data, req.params.id);

  res.redirect('/contacts');
})


//ROUTING TABLE Groups

app.get('/groups', function(req, res){
  db.all(`SELECT * FROM Groups`, function(err, rows) {
    if(!err) {
      res.render('groups', {data: rows});
    }
  })
})

app.get('/groups/delete/:id', function(req, res){
  deleteDataGroups(req.params.id);
  res.redirect('/groups')
})

app.get('/groups/edit/:id', function(req, res){
  db.all(`SELECT * FROM Groups WHERE id = '${req.params.id}'`, function(err, rows){
    if(!err){
      res.render('editGroups', {data:rows});
    }
  })
})


app.post('/groups/update/:id', function(req, res){
  let data = req.body;
  updateDataGroups(data, req.params.id);

  res.redirect('/groups')
})

app.post('/groups', function(req, res){
  let data = req.body;
  insertDataGrous(data);
  res.redirect('/groups');
})


//port server
app.listen(3000);









//QUERY

//CONTACTS TABLE QUERY
function updateDataContact(obj, id){
  db.run(`UPDATE Contacts SET
    name = '${obj.name}',
    company = '${obj.company}',
    telp_number = '${obj.telp_number}',
    email = '${obj.email}'
    WHERE id = '${id}';`);
}

function insertDataContact(obj){
  db.run(`INSERT INTO Contacts (name, company, telp_number, email)
    VALUES ('${obj.name}', '${obj.company}', '${obj.telp_number}', '${obj.email}')`)
}

function deleteDataContacs(id){
  db.run(`DELETE FROM Contacts WHERE id = ${id}`)
}


//GROUP TABLE QUERY
function insertDataGrous(obj){
  db.run(`INSERT INTO Groups (name_of_group)
  VALUES ('${obj.name_of_group}')`)
}

function deleteDataGroups(id){
  db.run(`DELETE FROM Groups WHERE id = ${id}`)
}

function updateDataGroups(obj, id){
  db.run(`UPDATE Groups SET name_of_group = '${obj.name_of_group}' WHERE id = '${id}'`)
}
