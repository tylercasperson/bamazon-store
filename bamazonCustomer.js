var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3004,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
})

// console.log('What is the id of the product you would like to buy?');
// console.log('How many units of ' + productName + ' would you like to buy?');

