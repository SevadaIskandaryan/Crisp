const express = require('express');
const path = require('path');
var bodyParser = require("body-parser"),
    cons = require("consolidate"),
    dust = require("dustjs-helpers"),
    {Pool, Client} = require("pg");
const { response } = require('express');


var urlencodedParser = bodyParser.urlencoded({ extended: false })  
const app = express();
app.engine("dust", cons.dust);
const port = 8000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Crisp',
    password: 'Postgres!2002',
    port: 5432
  })

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

app.post('/process_post', urlencodedParser, function (req, res) {  
    // Prepare output in JSON format  
     
    var name = req.body.name,
        email = req.body.email,
        password1 = req.body.password,
        password2 = req.body.password2;

    if(password1 != password2){res.redirect("/register")}

    res.sendFile(path.join(__dirname, "/views/dashboard.html"));  
 })  





app.listen(port, function (err) {
   if(err){
       console.log("Error while starting server");
   }
   else{
       console.log("Server has been started at "+port);
   }
})