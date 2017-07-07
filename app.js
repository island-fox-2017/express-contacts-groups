const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')))

var arrResult = []

app.get('/', function(req, res){
  res.render('index', {data : arrResult})
})

app.post('/', function(req, res){
  let nama = req.body.name;
  let address = req.body.address;
  obj = {};
  obj['name'] = nama;
  obj['address'] = address;
})
