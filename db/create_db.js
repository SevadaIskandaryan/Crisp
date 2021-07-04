var {Pool, Client} = require("pg");

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Crisp',
  password: 'Postgres!2002',
  port: 5432
})

function createDB(){
    console.log("worked or not");
    pool.query('CREATE TABLE users ( user_id serial PRIMARY KEY, \
      username VARCHAR ( 50 ) NOT NULL, \
      password VARCHAR ( 50 ) NOT NULL, \
      email VARCHAR ( 255 ) UNIQUE NOT NULL, \
      created_on TIMESTAMP , \
      last_login TIMESTAMP )', (err, res) => {
        console.log(err, res)
        pool.end()
      });
 }

createDB();