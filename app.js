// - Release 1 - Basic Routing for Contacts dan Groups
// Buatlah sejumlah route berikut dan tampilkan melalui view engine ejs
// ----------------------------------------------------------------------
// METHOD | ROUTE                | KETERANGAN
// ----------------------------------------------------------------------
// GET    | /contacts            | Menampilkan semua data contacts
// POST   | /contacts            | Menntuk input contact
// GET    | /contacts/edit/:id   | Menampilkan data contact spesifik untuk diubah
// POST   | /contacts/edit/:id   | Menerima data form untuk update contact
// GET    | /contacts/delete/:id | Menghapus data contact berdasarkan id

// GET    | /groups              | Menampilkan semua data groups
// POST   | /groups              | Menerima data form untuk input group
// GET    | /groups/edit/:id     | Menampilkan data group spesifik untuk diubah
// POST   | /groups/edit/:id     | Menerima data form untuk update group
// GET    | /groups/delete/:id   | Menghapus data group berdasarkan id

var express = require('express')
var path = require('path');
var app = express()
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var path_name = path.join(__dirname, 'public')
var express_static = express.static(path_name)
app.use(express_static);

var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('data.db');

// localhost:3000/
app.get('/', function(req, res){
  res.render("welcome")
})

// GET    | /contacts            | Menampilkan semua data contacts
app.get('/contacts', function(req,res) {
  db.all('Select * from Contacts', function(err, rows) {
    if(!err) {
      res.render('contacts', {panggilData: rows})
    }
  })
})

// POST   | /contacts            | Untuk input contact
app.post('/contacts', function(req, res){
  db.run(`INSERT INTO Contacts(name, company, telp_number, email)
  VALUES('${req.body.name}', '${req.body.company}', '${req.body.telepon}', '${req.body.email}')
  `)
  res.redirect('/contacts')
})

// GET    | /contacts/edit/:id   | Menampilkan data contact spesifik untuk diubah
// POST   | /contacts/edit/:id   | Menerima data form untuk update contact
app.get('/contacts/edit/:id', function(req, res){
  db.all(`SELECT * FROM Contacts WHERE id = '${req.params.id}'`, function(err,rows){
    if(!err) {
      res.render('editcontact', {panggilData: rows});
    }
  })
})

app.post('/contacts/edit/:id', function(req,res){
db.run(`UPDATE Contacts SET
name = '${req.body.name}',
company = '${req.body.company}',
telp_number = '${req.body.telepon}',
email = '${req.body.email}' WHERE id = '${req.params.id}';`)
res.redirect('/contacts');
})

// GET    | /contacts/delete/:id | Menghapus data contact berdasarkan id
app.get('/contacts/delete/:id', function(req,res){
db.run(`DELETE FROM Contacts WHERE id ='${req.params.id}'`)
res.redirect('/contacts');
})

// NOW FOR THE GROUPS =

// GET    | /groups            | Menampilkan semua data groups
app.get('/groups', function(req,res) {
  db.all('Select * from Groups', function(err, rows) {
    if(!err) {
      res.render('groups', {panggilData: rows})
    }
  })
})

// POST   | /groups            | Untuk input group
app.post('/groups', function(req, res){
  db.run(`INSERT INTO Groups(name_of_group)
  VALUES('${req.body.name_of_group}')
  `)
  res.redirect('/groups')
})

// GET    | /groups/edit/:id   | Menampilkan data group spesifik untuk diubah
// POST   | /groups/edit/:id   | Menerima data form untuk update group
app.get('/groups/edit/:id', function(req, res){
  db.all(`SELECT * FROM Groups WHERE id = '${req.params.id}';`, function(err,rows){
    if(!err) {
      res.render('editgroup', {panggilData: rows});
    }
  })
})

app.post('/groups/edit/:id', function(req,res){
  console.log("-------",req.body);
  db.run(`UPDATE Groups SET
    name_of_group = '${req.body.name_of_group}' WHERE id = '${req.params.id}';`)
      res.redirect('/groups');
})

// GET    | /groups/delete/:id | Menghapus data group berdasarkan id
app.get('/groups/delete/:id', function(req,res){
db.run(`DELETE FROM Groups WHERE id ='${req.params.id}'`)
res.redirect('/groups');
})

app.listen(3000)


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
POST   | /contacts            | Menntuk input contact
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
