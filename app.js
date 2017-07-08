const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data.db');

let app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/contacts', function (req, res) {
  db.all(`SELECT * FROM contacts`, function(err, rows) {
    if(!err) {
        res.render('contacts', {data: rows})
    }
  })
})

app.post('/contacts', function(req, res) {
  let name = req.body.name;
  let company = req.body.company;
  let telp_number = req.body.telp_number;
  let email = req.body.email;

  db.run(`INSERT INTO contacts (name, company, telp_number, email)
  VALUES ('${name}', '${company}', '${telp_number}', '${email}');`)
  console.log('Data created');

  res.redirect('/contacts')
});

app.get('/contacts/edit/:id', function(req, res) {
  db.all(`SELECT * FROM contacts WHERE id = '${req.params.id}'`, function(error, rows) {
    if (!error) {
      res.render('edit', {data: rows})
    }
  })
})

app.post('/contacts/update/:id', function(req, res) {
  let id = req.params.id;
  let name = req.body.name;
  let company = req.body.company;
  let telp_number = req.body.telp_number;
  let email = req.body.email;

  db.run(`UPDATE contacts set name = '${name}', company = '${company}', telp_number = '${telp_number}', email = '${email}' WHERE id = ${id};`);
  console.log('Data updated');
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id', function(req, res, next){
  let id = req.params.id
  db.run(`DELETE FROM Contacts WHERE id = ${id};`)
  res.redirect('/contacts');
})

//===================================GROUPS==================================================================//

app.get('/groups', function (req, res) {
  db.all(`SELECT * FROM groups`, function(err, rows) {
    if(!err) {
        res.render('groups', {data: rows})
    }
  })
})

app.post('/groups', function(req, res) {
  let name_group = req.body.name_group;

  db.run(`INSERT INTO groups (name_group) VALUES ('${name_group}');`)
  console.log('Data created');

  res.redirect('/groups')
});

app.get('/groups/edit/:id', function(req, res) {
  db.all(`SELECT * FROM groups WHERE id = '${req.params.id}'`, function(error, rows) {
    if (!error) {
      res.render('group-edit', {data: rows})
    }
  })
})

app.post('/groups/update/:id', function(req, res) {
  let id = req.params.id;
  let name_group = req.body.name_group;

  db.run(`UPDATE groups set name_group = '${name_group}' WHERE id = ${id};`);
  console.log('Data updated');
  res.redirect('/groups')
})

app.get('/groups/delete/:id', function(req, res, next){
  let id = req.params.id
  db.run(`DELETE FROM groups WHERE id = ${id};`)
  res.redirect('/groups');
})

app.listen(3000);

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
