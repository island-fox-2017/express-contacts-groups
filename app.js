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

var express = require('express')
var app = express()

var ejs = require('ejs')
app.set('view engine', 'ejs')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database/data.db')

// app.get('/', function(req,res) {
//   res.send('hello world!')
// })

app.get('/', function(req, res) {
  res.render('index')
})

// routing contact
app.get('/contacts', function(req,res) {
  db.all(`SELECT * FROM Contacts;`, function(err, data) {
    res.render('contact', {dataKontak: data})
  })
})

app.post('/contacts', function(req,res) {
  db.run(`INSERT INTO Contacts (name,company,phone_num,email) VALUES ('${req.body.formName}', '${req.body.formCompany}', '${req.body.formPhone}', '${req.body.formEmail}')`)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id',function(req, res) {
  db.run(`DELETE FROM Contacts WHERE id=${req.params.id}`)
  res.redirect('/contacts')
})

app.get('/contacts/edit/:id', function (req,res) {
  db.all(`SELECT * FROM Contact WHERE id = ${req.params.id};`, function(err, data){
    res.render('edit_contact', {dataEdit: data})
  })
})

app.post('/contacts/edit/:id', function(req,res) {
  db.run(`UPDATE Contact SET name=${req.body.formName}, company=${req.body.formCompany}, phone_num=${req.body.formPhone}, email=${req.body.formEmail} WHERE id = ${req.params.id}`)
  res.redirect('/contacts')
})

// routing group
app.get('/groups', function(req,res) {
  db.all(`SELECT * FROM Groups;`, function(err, data) {
    res.render('group', {dataGrup: data})
  })
})

app.post('/groups', function(req,res) {
  db.run(`INSERT INTO Groups (name_of_group) VALUES ('${req.body.formGroupName}')`)
  res.redirect('/groups')
})

app.get('/groups/delete/:id',function(req, res) {
  db.run(`DELETE FROM Groups WHERE id=${req.params.id}`)
  res.redirect('/groups')
})

app.get('/groups/edit/:id', function (req,res) {
  db.all(`SELECT * FROM Groups WHERE id = ${req.params.id};`, function(err, data){
    res.render('edit_group', {dataEdit: data})
  })
})

app.post('/groups/edit/:id', function(req,res) {
  db.run(`UPDATE Groups SET name_of_group = ${req.body.formGroupName} WHERE id = ${req.params.id};`)
  res.redirect('/groups')
})




app.listen(3000)
