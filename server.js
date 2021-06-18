const express = require('express');
const path = require('path');

  
const app = express();
  
const port = 8000;
  
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