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
    if(req.body.register_login == "Register"){
        var name = req.body.name,
            email = req.body.email,
            password1 = req.body.password,
            password2 = req.body.password2;

        if(password1 != password2){
            res.redirect("/register");
        }else{pool.query("INSERT INTO users(username, password, email) VALUES ($1, $2, $3)", [name, password1, email], (err, res) => {
            console.log(err, res)});
        }
    }else if(req.body.register_login == "Login"){
        var email = req.body.email,
            password = req.body.password;
        
        console.log(email + "  " + password)
        pool.query("SELECT * FROM users WHERE email=$1 AND password=$2", [email, password],  (err, result) => {
            console.log(result)
            console.log("!!!!!!!!!!!!!!!!!!!")
            console.log(result.rowCount)
            if(result.rowCount == 0){
                res.redirect("/register");
            }else{
                console.log("hello")
            }
        });
           
        //var passwordDB = pool.query("SELECT * FROM ");
    }
    

    

    

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