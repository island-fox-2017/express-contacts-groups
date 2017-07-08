const express = require('express');
const app = express();
const sqlite = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
var library = require('./library')//Lib of functions

var db = new sqlite.Database('./db/data.db');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.set('view engine', 'ejs');

//HOMEPAGE
app.get('/', (req, res) => {
   res.render('index');
});

//CONTACTS PAGE
app.get('/contacts', (req, res) => {
    //RUN QUERY
    db.all("SELECT * FROM Contacts;", (err, data) => {
        res.render('contacts', {data_contacts : data});
    });
});

app.post('/contacts', (req, res) => {
    library.insertContacts(req.body);

    res.redirect('/contacts');
    });

//EDIT CONTACTS PAGE
app.get('/contacts/edit/:id', (req, res) => {
    //RUN QUERY
    db.all(`SELECT * FROM Contacts WHERE id = '${req.params.id}';`, (err, data) => {
       res.render('edit_contacts', {data_contacts : data});
    });
});

app.post('/contacts/edit/:id', (req, res) => {
    library.editContacts(req.body);

    res.redirect('/contacts');
});

//DELETE CONTACTS
app.get('/contacts/delete/:id', (req, res) => {
    library.removeContacts(req.params.id);

    res.redirect('/contacts');
})

//=======================================================================//

//GROUPS PAGE
app.get('/groups', (req, res) => {
    //RUN QUERY
    db.all("SELECT * FROM Groups;", (err, data) => {
        res.render('groups', {data_contacts : data});
    });
});

app.post('/groups', (req, res) => {
    library.insertGroups(req.body);

    res.redirect('/groups');
    });

//EDIT GROUPS PAGE
app.get('/groups/edit/:id', (req, res) => {
    //RUN QUERY
    db.all(`SELECT * FROM Groups WHERE id = '${req.params.id}';`, (err, data) => {
       res.render('edit_groups', {data_groups : data});
    });
});

app.post('/groups/edit/:id', (req, res) => {
    library.editGroups(req.body);

    res.redirect('/groups');
});

//DELETE GROUPS
app.get('/groups/delete/:id', (req, res) => {
    library.removeGroups(req.params.id);

    res.redirect('/groups');
});

app.listen(3000);
