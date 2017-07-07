var express = require ('express');
var path = require ('path');
var app = express()
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended : true}))
app.set('view engine', 'ejs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

app.get ('/', function (req, res){
  res.render ('index')
})

app.get ('/contacts', function(req, res){
  db.run(`INSERT INTO contacts(name, company, telp_number,email) VALUES ('Teja', 'Ztap', '08122989898', 'teza@gmail.com');`)
  res.render ('contacts')

})

app.get ('/groups', function(req, res){
  db.run(`INSERT INTO groups (name_of_group) VALUES ('DOTA2');`)
  res.render ('groups')
})

app.listen(3000)
