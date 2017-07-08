'use strict'

const express = require('express');
const sqlite = require('sqlite3');
const bodyParser = require('body-parser');

var db = new sqlite.Database('./Data/data.db');

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

app.get('/contacts/edit', function(req, res) {
  db.all(`SELECT * FROM Data_Contacts WHERE id = "${req.params.id}"`, function(err, db_contacts) {
    res.render('edit', {data: db_contacts})
  })
})

app.post('/contacts/edit', function(req, res) {
  db.run(`UPDATE Contacts SET nama = '${req.body.name}', Company = '${req.body.Company}', num_telp = '${req.body.num_telp}', email = '${req.body.email}'WHERE id = ${req.params.id}`);
  res.redirect('/contacts');
})

app.post('/contacts/delete', function(req, res) {
  db.run(`DELETE FROM Contacts nama = '${req.body.name}', Company = '${req.body.Company}', num_telp = '${req.body.num_telp}', email = '${req.body.email}' WHERE id = ${req.params.id}`);
  res.redirect('/contacts');
})


// function deleteData() {
//   //DELETE FROM NAMA_TABLE WHERE condition
//   DELETE FROM Students WHERE id = 3;
// }



//  UPDATE NAMA_TABLE SET column_yangingindiubah WHERE condition
//   UPDATE Students SET lastName = 'End', email =  WHERE id = 3;
// }

// app.post('/contacts', function(req, res) {
//   let name = req.body.name;
//   let company = req.body.company;
//   let telp_number = req.body.telp_number;
//   let email = req.body.email;
//
//   db.run(`INSERT INTO contacts (name, company, telp_number, email)
//   VALUES ('${name}', '${company}', '${telp_number}', '${email}');`)
//
//   console.log('Data Ditulis');
//
//   res.redirect('/contacts')
// });
//

//
// app.get('/contacts/delete', function(req, res) {
//   res.render('delete')
// })
//
// app.get('/groups', function(req, res) {
//   res.render('groups')
// })
//
// app.get('/groups/edit', function(req, res) {
//   res.render('edit')
// })
//
// app.get('/groups/delete', function(req, res) {
//   res.render('/delete')
// })
//
// app.get('/groups/edit')

app.listen(3003)
