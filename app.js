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

const express = require('express');
const sqlite3 = require('sqlite3').verbose();


var app = express();
var db = new sqlite3.Database('./db/contact_group.db')
var bodyParser = require('body-parser')

app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())


//routing Main page
app.get('/', function (req, res){
  
  res.render('index',{header : 'This is main page'});
})

//routing contacts
app.get('/contacts', function(req, res){
  db.all(`select * from Contacts`, function (err, data){
    res.render('contacts',{header : 'This is contacts page', data : data})
  })
  
})

app.get('/input_data_contacts', function(req, res){
  db.run(`insert into Contacts (id, name, company, telp_number, email) 
        values ('1','rusli abdul gani','hacktiv8','0813777888','rusli.gani88@gmail.com')`);
  res.send('input data berhasil');
})

app.post('/contacts', function(req, res){
  db.run(`insert into Contacts (name, company, telp_number, email) 
        values ('${req.body.name}','${req.body.company}','${req.body.telp_number}','${req.body.email}')`)
  res.redirect('/contacts')
})

app.get('/contacts/edit/:id', function(req, res){
  db.all(`select * from 'Contacts' where id='${req.params.id}' `, function(err, data){
    if(!err){
    res.render('edit_contact', {header: 'Edit Contact Page', data : data})
  }
  });
})

app.post('/contacts/edit/:id', function(req, res){
  db.run(`update Contacts set name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' where id = '${req.params.id}'`)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id', function(req, res){
  db.run(`delete from 'Contacts' where id='${req.params.id}'`);
  res.redirect(`/contacts`)
})

//routing groups

app.get('/input_data_groups', function(req, res){
  db.run(`insert into Groups (name_of_group) 
        values ('hacktiv8')`);
  res.send('input data group berhasil');
})

app.get('/groups', function(req, res){
  db.all(`select * from Groups`, function(err, data){
    if(!err){
      res.render('groups', {header : 'Groups Page', data : data})
    }
  })
})

app.post('/groups', function (req, res){
  db.run(`insert into Groups (name_of_group) values ('${req.body.name_of_group}')`);
  res.redirect('/groups')
})

app.get('/groups/edit/:id', function(req, res){
  db.all(`select * from Groups where id = '${req.params.id}'`, function (err, data){
    if(!err){
      res.render('edit_group', {header : 'Edit Group Page', data : data})
    }
  })
})

app.post('/groups/edit/:id', function(req, res){
  db.run(`update Groups set name_of_group = '${req.body.name_of_group}' where id = '${req.params.id}'`);
  res.redirect('/groups')
})


app.get('/groups/delete/:id', function(req, res){
  db.run(`delete from 'Groups' where id = '${req.params.id}'`);
  res.redirect('/groups')
})


app.listen(3000)
