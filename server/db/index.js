var mysql = require('mysql');

//Use mysql module to create a connection to mysql.
var dbConnection = mysql.createConnection({
      user: 'root',
      password: 'root',
      host: 'localhost',
      database: 'chat'
    });

module.exports.dbConnection = dbConnection;

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


