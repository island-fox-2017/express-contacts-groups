const express = require('express')
const app = express()

const sqlite3 = require ('sqlite3').verbose();
const db = new sqlite3.Database('./db/data1.db');
const bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())
app.set('view engine','ejs')


app.get('/', function(req, res) {
  res.render('index', {nama:"Halaman Utama"})
})

 //CONTACT
app.get('/contact', function(req, res){
  db.all(`SELECT * FROM Contacts`, function(err, rows){
    res.render('contact', {all:rows})
    })
  })

app.post('/contact',function(req, res){
  db.run(`INSERT INTO Contacts(name, company, telp_number, email)
  VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telepon_number}', '${req.body.email}')`)
  res.redirect('/contact')
})

app.get('/contact/edit/:id', function(req, res){
  db.all(`SELECT * FROM Contacts WHERE id = ${req.params.id} `, function(err, rows){
    res.render('edit', {all:rows})
    })
  })

app.post('/contact/edit/:id', function(req, res){
  db.run(`UPDATE Contacts set name ='${req.body.name}',company = '${req.body.company}',
  telp_number = '${req.body.telepon_number}', email = '${req.body.email}' WHERE id =${req.params.id}`)
  res.redirect('/contact')
})

app.get('/contact/delete/:id', function(req, res){
  db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`)
  res.redirect('/contact')
})

 //GROUP
 app.get('/group', function(req, res){
   db.all(`SELECT * FROM Groups`, function(err, rows){
     res.render('group', {allG:rows})
     })
   })

  app.post('/group',function(req, res){
    db.run(`INSERT INTO Groups(name_of_group)
    VALUES ('${req.body.group}')`)
    res.redirect('/group')
   })

   app.get('/group/edit/:id', function(req, res){
     db.all(`SELECT * FROM Groups WHERE id = ${req.params.id} `, function(err, rows){
       res.render('editG', {allG:rows})
       })
     })

  app.post('/group/editG/:id', function(req, res){
    db.run(`UPDATE Groups SET name_of_group = "${req.body.group}" WHERE id = ${req.params.id}`)
    res.redirect('/group')
  })

  app.get('/group/deleteG/:id', function(req, res){
    db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`)
    res.redirect('/group')
  })

app.listen(3008)


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
