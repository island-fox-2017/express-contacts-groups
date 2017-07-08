var express = require("express")
var path = require("path")
var bodyParser = require("body-parser")
var app = express();
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/database.db')
app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

// Method untuk Insert sebuah value ke dalam table yang udah dibuat
// function insertTabel() {
//   db.run(`INSERT INTO Data_Contact(name, company, telp_number, email) VALUES ("Ganang", "Hacktiv8", "085372281600", "gananggww@gmail.com")`)
// }
// app.get("/show", function(req, res) {
//   // insertTabel()
//   res.send("Berhasil")
// })
//================Kontak=================
//display all contact list
app.get("/home/contacts", function(req, res) {
  db.all(`SELECT * FROM Data_Contact`, function(err, db_Contact) {
    res.render("contacts", {data : db_Contact})
  })
})

//display form isi Kontak
app.get("/home/contacts/add", function(req, res) {
  res.render("form")
})

//insert ke database
app.post("/home/contacts/add", function(req, res) {
  db.run(`INSERT INTO Data_Contact(name, company, telp_number, email) VALUES
  ("${req.body.name}","${req.body.company}","${req.body.telp})","${req.body.email}")`)
  res.redirect("/home/contacts")
})

//edit database
app.get("/home/contacts/edit/:id",function(req, res) {
  db.all(`SELECT * FROM Data_Contact WHERE id = "${req.params.id}"`, function(err, db_Contact) {
    res.render("edit", {data : db_Contact})
  })
})
//insert hasil edit database
app.post("/home/contacts/edit/:id",function(req, res) {
  db.run(`UPDATE Data_Contact SET name = "${req.body.name}", company = "${req.body.company}", telp_number = "${req.body.telp}", email = "${req.body.email}" WHERE id = "${req.params.id}"`)
  res.redirect("/home/contacts")
})
//delete record
app.get("/home/contacts/delete/:id", function(req, res) {
  db.run(`DELETE FROM Data_Contact WHERE id = "${req.params.id}"`)
  res.redirect("/home/contacts")
})
//====================================


//============HOMEPAGE================

app.get("/home", function(req, res) {
  res.render("index")
})
app.get("/", function(req, res) {
  // res.render("index")
  res.redirect("/home")
})
//=====================================

//==============GROUPS=================

app.get("/home/groups",function(req, res) {
  db.all(`SELECT * FROM Data_Groups`,function(err, db_Groups) {
    res.render("groups",{ data_groups : db_Groups})
  })
})

app.get("/home/groups/add", function(req, res) {
  res.render("groups-form")
})

app.post("/home/groups/add",function(req, res) {
  db.run(`INSERT INTO Data_Groups(groups) VALUES ("${req.body.groups}")`)
  res.redirect("/home/groups")
})

app.get("/home/groups/edit/:id", function(req, res) {
  db.all(`SELECT * FROM Data_Groups WHERE id = "${req.params.id}"`, function(err, db_Groups) {
    res.render("groups-edit", {data_groups : db_Groups})
  })
})
app.post("/home/groups/edit/:id",function(req, res) {
  db.run(`UPDATE Data_Groups SET groups = "${req.body.groups}" WHERE id = "${req.params.id}"`)
  res.redirect("/home/groups")
})
app.get("/home/groups/delete/:id", function(req, res) {
  db.run(`DELETE FROM Data_Groups WHERE id = "${req.params.id}"`)
  res.redirect("/home/groups")
})
//=====================================

app.listen(3010);
