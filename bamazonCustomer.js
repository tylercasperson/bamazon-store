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
    welcome();
    // readCustomer();
    // readDepartments();
    // readEmployees();
});

// console.log('What is the id of the product you would like to buy?');
// console.log('How many units of ' + productName + ' would you like to buy?');


function welcome(){
    console.log('__________________Welcome to bamazon!______________________________');
    console.log();
    // console.log('Which department would you like to see products in? Enter the id.');
    readDepartments();
}

function readDepartments(){
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err; 
        
        var data = [
            ['id', 'Department']
        ]
        for(var i =0; i<res.length;i++){        
            data.push([res[i].departmentID, res[i].departmentName],);
        }        
        console.log(table(data));
        whichDepartment();
        // connection.end();
    });
    
}

function whichDepartment(){
    inquirer.prompt({
            name: "whichDepartment",
            type: "input",
            message: "Which department would you like to see products in? Please select an id."
        })
        .then(function(departmentResponse){
            var departmentDecision = departmentResponse.whichDepartment;
            connection.query("SELECT * FROM products INNER JOIN departments ON departments.departmentID = deptID AND deptID = ?", departmentDecision, function(err, res) {
                if (err) throw err;
                if(res.length === 0){
                    console.log('The selection is not valid. Please enter a department on the list.');
                    whichDepartment();
                } else {
                    var data = [
                        ['id', 'ProductName', 'Price']
                    ]
                    for(var i =0; i<res.length;i++){        
                        data.push([res[i].productID, res[i].productName, res[i].price],);            
                    }        
                    console.log(table(data));
                    connection.end();
                }
            });
        });
};




function readCustomer(){
    connection.query("SELECT * FROM products INNER JOIN departments ON departments.departmentID = deptid AND deptID = ?", function(err, res) {
        if (err) throw err;    
        
        var data = [
            ['id', 'ProductName', 'Price']
        ]
        for(var i =0; i<res.length;i++){        
            data.push([res[i].productID, res[i].productName, res[i].price],);            
        }        
        console.log(table(data));
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
