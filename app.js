var express = require ('express');
var path = require ('path');
var app = express()
var bodyParser = require ('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.set('view engine', 'ejs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

app.get ('/', function (req, res){
  res.render ('index')
})

app.get ('/contacts', function(req, res){
db.all ('SELECT * FROM contacts',function (err, datas) {
  res.render('contacts', {contact: datas})
  })
})

app.post ('/contacts', function(req,res){
  db.run(`INSERT INTO contacts(name,company,telp_number,email) VALUES ('${req.body.Name}','${req.body.Company}','${req.body.Telephone}','${req.body.Email}');`)
  res.redirect(`/contacts`)
})

app.get ('/contacts/delete/:id', function (req, res) {
  db.run(`DELETE FROM contacts WHERE id = ${req.params.id}`)
  res.redirect(`/contacts`)
})

app.get ('/contacts/edit/:id', function (req, res){
  console.log(`SELECT * FROM contacts WHERE id = ${req.params.id}`);
  db.all(`SELECT * FROM contacts WHERE id = ${req.params.id}`, function (err, rows){
    if (!err) {
      console.log(rows);
      res.render(`edit`, {input : rows})
    }
  })
})

app.post ('/contacts/edit/:id' , function(req, res){
  db.run(`UPDATE contacts SET name = '${req.body.Name}', company = '${req.body.Company}', telp_number = '${req.body.Telephone}', email = '${req.body.Email}' WHERE id = '${req.params.id}'`)
  res.redirect(`/contacts`)
})

app.get ('/groups', function(req, res){
db.all ('SELECT * FROM groups',function (err, datas) {
  res.render('groups', {groups: datas})
  })
})

app.post ('/groups', function(req,res){
  db.run(`INSERT INTO groups (name_of_group) VALUES ('${req.body.name_of_group}');`)
  res.redirect(`/groups`)
})



app.listen(3000)
