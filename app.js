const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');

let myQuery = require('./myQuery.js');

let db = new sqlite3.Database('./db/data.db');
let app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function (req, res) {
  res.render('index');
});

app.get('/contacts', function (req, res) {
  db.all(`
    SELECT * FROM Contacts;
    `, function(err, rows) {
      if(!err) {
        res.render('contacts', {datas: rows});
      }
    });
});

app.post('/contacts', function (req, res) {
  let objStartup = {}
  objStartup.name = req.body.name;
  objStartup.company = req.body.company;
  objStartup.telp_number = req.body.telp_number;
  objStartup.email = req.body.email;

  myQuery.insertData(objStartup);
  //myQuery.showData();
  res.redirect('/contacts')
});

app.get('/contacts/delete/:id', function(req, res) {
  let deleteId = req.params.id;
  myQuery.deleteData(deleteId);
  res.redirect('/contacts');
});

app.get('/contacts/edit/:id', function (req, res) {
  let editId = req.params.id;

  db.all(`
    SELECT * FROM Contacts WHERE id = ${editId};
    `, function (err, rows) {
      if (!err) {
        res.render('edit', {data: rows});
      }
    });
});

app.post('/contacts/edit/:id', function (req, res) {
  let objEdit = {};
  objEdit.id = req.body.id;
  objEdit.name = req.body.name;
  objEdit.company = req.body.company;
  objEdit.telp_number = req.body.telp_number;
  objEdit.email = req.body.email;

  myQuery.editData(objEdit);
  res.redirect('/contacts');
});


// Groups

app.get('/groups', function (req, res) {
  db.all(`
    SELECT * FROM Groups;
    `, function(err, rows) {
      if(!err) {
        res.render('groups', {datas: rows});
      }
    });
});

app.post('/groups', function (req, res) {
  let objStartup = {}
  objStartup.name_of_group = req.body.name_of_group;

  myQuery.insertData2(objStartup);
  //myQuery.showData();
  res.redirect('/groups')
});

app.get('/groups/delete/:id', function(req, res) {
  let deleteId = req.params.id;
  myQuery.deleteData2(deleteId);
  res.redirect('/groups');
});

app.get('/groups/edit/:id', function (req, res) {
  let editId = req.params.id;

  db.all(`
    SELECT * FROM Groups WHERE id = ${editId};
    `, function (err, rows) {
      if (!err) {
        res.render('editGroups', {data: rows});
      }
    });
});

app.post('/groups/edit/:id', function (req, res) {
  let objEdit = {};
  objEdit.id = req.body.id;
  objEdit.name_of_group = req.body.name_of_group;

  myQuery.editData2(objEdit);
  res.redirect('/groups');
});

app.listen(3001);
