var express = require('express');
var path = require('path');
var app = express();
var lib = require('./setup');

var sqlite = require('sqlite3').verbose(); //verbose untuk perbaris
var db = new sqlite.Database('./db/database.db');

app.set('view engine', 'ejs');

// app.use('/foo', router);
// var removeRoute = require('express-remove-route');
// var router = express.Router();
// removeRoute(app, '/foo/contacts/delete:id','get');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/setupdb', function(req, res){
  lib();
  res.send('Berhasil SetUp Database');
});

app.get('/', function(req, res){
  res.render('index');
});

app.get('/insert_data', function(req, res){
  db.run(`INSERT INTO Contacts(name, company, telp_number, email) VALUES ("Becky", "Paws Pte Ltd", "021589898", "paws.company@mail.com");`);
  db.run(`INSERT INTO Groups(name_of_group) VALUES ("Beginner Group");`);
  res.render('insert_data');
});

app.get('/contacts', function(req, res){
  db.all(`SELECT * FROM Contacts`, function(err, rows){
    res.render('contacts', {data: rows});
  });
});

app.post('/contacts', function(req, res){
  db.run(`INSERT INTO Contacts(name, company, telp_number, email) VALUES ('${req.body.ownerName}', '${req.body.company}', '${req.body.telpComp}', '${req.body.emailCompany}')`)
  res.redirect('/contacts');
});

// app.get('/contacts/edit/:id', function(req, res){
//   console.log(req.query.id);
// });
app.get('/contacts/edit/:id', function (req, res, next){
  db.all(`SELECT id FROM Contacts`, function(err, rows){
  //res.render('edit', { edit_data : rows})
  res.render('edit', {edit_data: req.params});
  next();
  });
});

app.post('/contacts/edit/:id', function(req, res){
  db.run(`UPDATE Contacts SET name ='${req.body.ownerName}', company ='${req.body.company}', telp_number ='${req.body.telpComp}', email ='${req.body.emailCompany}' WHERE id= '${req.params}' `)
  res.redirect('/contacts');
});

app.get('/contacts/delete/:id', function (req, res) {
  db.all(`DELETE FROM Contacts WHERE id = '${req.params}' `, function(err, rows){
    //res.render('delete')
    res.redirect('/contacts');
  });
});
// app.get('/contacts/edit/:id', routes.edit);

app.get('/groups', function(req, res){
  db.all(`SELECT * FROM Groups`, function(err, rows){
    res.render('groups', {group_data: rows});
  });
});

app.post('/groups', function(req, res){
  db.run(`INSERT INTO Groups(name_of_group) VALUES ('${req.body.nameGroups}')`)
  res.redirect('/groups');
});

app.get('/groups/edit/:id', function (req, res){
  db.all(`SELECT id FROM Groups`, function(err, rows){
  res.render('editGroups', {grup_data: req.params});
  });
});

app.post('/groups/edit/:id', function(req, res){
  db.run(`UPDATE Groups SET name_of_group ='${req.body.nameGroups}' WHERE id= '${req.params}' `)
  res.redirect('/groups');
});

app.get('/groups/delete/:id', function (req, res) {
  db.all(`DELETE FROM Groups WHERE id = '${req.params}'`, function(err, rows){
    res.redirect('/groups');
  });
});


app.listen(3001);
