const express = require('express');
const path = require('path');
var bodyParser = require("body-parser"),
    cons = require("consolidate"),
    dust = require("dustjs-helpers"),
    pg = require("pg"),;


  
const app = express();

var connect = "postgres://Project:Postgres!2002@localhost/Crisp";

app.engine("dust", cons.dust);

const port = 8000;
  
app.set("view engine", "dust");
app.set("views", __dirname + "/views");





app.get('/', function (req, res) {
    res.send('we are at the root route of our server');
  })

app.get('/login', function (req, res){
    res.sendFile(path.join(__dirname, "/views/login.html"));
})


app.get('/register', function (req, res){
    res.sendFile(path.join(__dirname, "/views/register.html"));
})

app.listen(port, function (err) {
   if(err){
       console.log("Error while starting server");
   }
   else{
       console.log("Server has been started at "+port);
   }
})