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
    console.log();
    readDepartments();
};

function readDepartments(){
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err; 
        
        var data = [
            ['id', 'Department']
        ]
        for(var i =0; i<res.length;i++){        
            data.push([res[i].departmentID, res[i].departmentName],);
        }  
        console.log();      
        console.log(table(data));
        whichDepartment();
    });
};

function readProduct(department){
    connection.query("SELECT * FROM products INNER JOIN departments ON departments.departmentID = deptID AND deptID = ?", department, function(err, res) {
        if(err) throw err;
        var data = [
            ['id', 'ProductName', 'Quantity', 'Price']
        ];
        var config = {
            columns: {
                0: {
                    alignment: 'center'
                },
                2: {
                    alignment: 'center'
                },
            }
        };
        for(var i =0; i<res.length;i++){   
            data.push([res[i].productID, res[i].productName, res[i].quantityOnHand, '$' + res[i].price]);
        }
        console.log();        
        console.log(table(data, config));
    });
};

function specificProduct(thisOne){
    connection.query("SELECT * FROM products WHERE productID =" + thisOne[Object.keys(thisOne)[0]], function(err, res) {
        if(err) throw err;
        var data = [
            ['id', 'ProductName','Quantity', 'Price']
        ];
        var config = {
            columns: {
                0: {
                    alignment: 'center'
                },
                2: {
                    alignment: 'center'
                },
            }
        };
        for(var i =0; i<res.length;i++){        
            data.push([res[i].productID, res[i].productName, res[i].quantityOnHand, res[i].price]);            
        }    
        console.log();    
        console.log(table(data, config));
    });
};

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
                    readProduct(departmentDecision);
                    inquirer.prompt({
                        name: "whichProduct",
                        type: "input",
                        message: "Which product would you like to purchase?"
                    })
                    .then(function(productResponse){
                        specificProduct(productResponse);
                        inquirer.prompt({
                            name: "howMany",
                            type: "input",
                            message: "How many would you like to purchase?"
                        })
                        .then(function(qunatity){
                            var qty = qunatity.howMany;
                            console.log(qty);
                            if (qty > res[0].quantityOnHand){
                                console.log("I am sorry but we only have " + res[0].quantityOnHand + " in stock.")
                                console.log("GET OUT!");
                                connection.end();
                            } else {
                                var newQty = res[0].quantityOnHand - qty;
                                
                                connection.query("UPDATE products SET quantityOnHand =" + newQty + " WHERE productID=" + productResponse[Object.keys(productResponse)[0]] + ";", function(err, resUpdate) {
                                    if (err) throw err;
                                    console.log("");
                                    console.log("Your order has been processed.");
                                    console.log("Thank you for choosing bamazon!");
                                    connection.end();
                                })
                            }
                        })
                    });
                    } //end of else
            });
        })
    };
