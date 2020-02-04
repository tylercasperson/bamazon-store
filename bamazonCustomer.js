require ("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
// var table = require("table");
const table = require('table').table

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.dbUserName,
    password: process.env.dbPassword,
    database: "bamazonDB"
});

connection.connect(function(err) {
    console.log('1');
    process.on('uncaughtException', function (err) {
        console.log(err);
    }); 
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
    // readDepartments();
    // readEmployees();
});

// console.log('What is the id of the product you would like to buy?');
// console.log('How many units of ' + productName + ' would you like to buy?');

function readProducts(){
    console.log('Selecting all products...\n');
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;     
        
        var data = [
            ['id', 'productName', 'departmentID', 'cost', 'price', 'QOH', 'min', 'max']
        ]
        for(var i =0; i<res.length;i++){        
            data.push([res[i].id, res[i].productName, res[i].deptID, res[i].cost, res[i].price, res[i].quantityOnHand, res[i].minLevel, res[i].maxLevel],);            
        }        
        console.log(table(data));
        connection.end();
    });
}

function readDepartments(){
    console.log('Selecting all departments...\n');
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

function readEmployees(){
    console.log('Selecting all Employees...\n');
    connection.query("SELECT * FROM employees", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}