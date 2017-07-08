const express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

var setupDB = require('./setup');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var path_name = path.join(__dirname, 'public');
var express_static = express.static(path_name);

//to create contact's table
app.get('/setupdb', function(req, res){
  setupDB();
  res.send('Database Table Created!!');
});
//to create ContactGroup's table
app.get('/dbgroup', function(req, res){
  db.run('CREATE TABLE IF NOT EXISTS ContactGroup(id INTEGER primary key AUTOINCREMENT, GroupName TEXT)');
  res.send('Database Group telah di buat');
});

//the home page
app.get('/home', function(req, res){
  res.render('home');
});
//the contact page
app.get('/contact', function(req, res){
  db.all(`SELECT * FROM Contact`, function(err, data){
    res.render('contact', {data_contact: data});
  });
});
//go to form page
app.get('/contact/add', function(req, res){
  res.render('form');
});
//submit data from add page and will going back to contact page
app.post('/contact/add', function(req, res){
  db.run(`INSERT INTO Contact(Name, Company, Telp, Email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp}', '${req.body.email}')`);
  res.redirect('/contact');
})
// go to edit page
app.get('/contact/edit/:id', function(req, res){
  db.all(`SELECT * FROM Contact WHERE id = '${req.params.id}'`, function(err, result){
    res.render('edit', {data: result});
  });
});
// post edit from the form page
app.post('/contact/edit/:id', function(req, res){
  db.run(`UPDATE Contact SET Name = '${req.body.Name}', Company = '${req.body.Company}', Telp = '${req.body.Telp}', Email = '${req.body.Email}' WHERE id = ${req.params.id}`);
  res.redirect('/contact');
});
// delete data
app.get('/contact/delete/:id', function(req, res){
  db.run(`DELETE FROM Contact WHERE id = '${req.params.id}'`);
  res.redirect('/contact');
});

//show group info on group page
app.get('/group', function(req, res){
  db.all('SELECT * FROM ContactGroup', function(err, data){
    res.render('group', {dataGroup: data});
  });
});
//go to group form to add group
app.get('/group/addgroup', function(req, res){
  res.render('groupaddform');
});
//add new group on database
app.post('/group/addgroup', function(req, res){
  db.run(`INSERT INTO ContactGroup(GroupName) VALUES ('${req.body.groupname}')`)
  res.redirect('/group');
})
//go to the group edit form
app.get('/group/edit/:id', function(req, res){
  db.all(`SELECT * FROM ContactGroup WHERE id = '${req.params.id}'`, function(err, result){
    res.render('groupedit', {dataGroup: result});
  });
});
//edit data group from groupeditform
app.post('/group/edit/:id', function(req, res){
  db.run(`UPDATE ContactGroup SET GroupName = '${req.body.groupname}' WHERE id = ${req.params.id}`);
  res.redirect('/group');
})
//delete data from group info interface
app.get('/group/delete/:id', function(req, res){
  db.run(`DELETE FROM ContactGroup WHERE id = ${req.params.id}`);
  res.redirect('/group');
})

app.listen(3000);
