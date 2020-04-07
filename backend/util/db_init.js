const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "devuser",
    password: "Monu@7858",
    database: "spring_db"
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;
