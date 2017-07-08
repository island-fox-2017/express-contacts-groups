const express = require('express')
const app = express()
const bodyParser = require ('body-parser')
const ejs = require('ejs')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.set('view engine', 'ejs')

app.get('/',function(req,res) {
   res.render('index',{titleTask : 'Contact&Group'})
})

app.get('/contacts', function(req,res){
  db.all(`SELECT * FROM Contact`, function(err, rows){
    res.render('contact',{contactsInput : rows })
  })
})
app.post('/contacts',function(req, res){
  db.run(`INSERT INTO Contact (name,company,telp_number,email)
          VALUES ('${req.body.name}','${req.body.company}','${req.body.phone}','${req.body.email}')`)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id',function(req ,res) {
  db.run(`DELETE FROM Contact WHERE id = ${req.params.id}`)
  res.redirect('/contacts');
})
app.get(`/contacts/edit/:id`,function (req,res) {
db.all(`SELECT *  FROM Contact WHERE rowid = ${req.params.id} `, function(err, rows){
      res.render('edit',{editInput : rows })
  })
})

app.post('/contacts/edit/:id',function (req,res) {
  db.run(`UPDATE Contact SET
    name = '${req.body.name}',
    company = '${req.body.company}',
    telp_number = '${req.body.phone}',
    email = '${req.body.email}'
    WHERE id = '${req.body.id}'`)
  res.redirect('/contacts')
})

app.get('/groups',function (req,res) {
  db.all(`SELECT * FROM Groups`, function(err, rows){
    res.render('groups',{groupInput : rows })
  })
})
app.post('/groups',function (req,res) {
  db.run(`INSERT INTO Groups (name_of_group)
  VALUES ('${req.body.groupName}')`)
  res.redirect("/groups")
})

app.get('/groups/delete/:id',function (req,res) {
  db.run(`DELETE FROM Groups WHERE id =${req.params.id}`)
  res.redirect('/groups')
})

app.get('/groups/edit/:id',function (req,res) {
  db.all(`SELECT * FROM Groups WHERE rowid = ${req.params.id} `, function(err, rows){
    res.render('editGroups',{editGroups: rows })
  })
})
app.post('/groups/edit/:id',function (req,res) {
  db.run(`UPDATE  Groups SET name_of_group = '${req.body.name}'  WHERE id = '${req.body.id}'`)
  res.redirect('/groups')
})

app.listen(3000)
