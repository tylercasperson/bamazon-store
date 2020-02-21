require ("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require('table').table

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.dbUserName,
    password: process.env.dbPassword,
    database: "bamazonDB"
});

connection.connect(function(err) {
    process.on('uncaughtException', function (err) {
        console.log(err);
    }); 
    console.log("connected as id " + connection.threadId + "\n");
    welcome();
});

function welcome(){
    console.log('__________________Welcome to bamazon!______________________________');
    console.log('______________________Manager View_________________________________');
    console.log();
    readDepartments();
};

