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

function readProduct(department){
    connection.query("SELECT * FROM products INNER JOIN departments ON departments.departmentID = deptID AND deptID = ?", department, function(err, res) {
        if(err) throw err;
        var data = [
            ['id', 'ProductName', 'Price']
        ]
        for(var i =0; i<res.length;i++){        
            data.push([res[i].productID, res[i].productName, res[i].price],);            
        }        
        console.log(table(data));
    });
}

function specificProduct(thisOne){
    connection.query("SELECT * FROM products WHERE productID =" + thisOne[Object.keys(thisOne)[0]], function(err, res) {
        if(err) throw err;
        var data = [
            ['id', 'ProductName', 'Price']
        ]
        for(var i =0; i<res.length;i++){        
            data.push([res[i].productID, res[i].productName, res[i].price]);            
        }        
        console.log(table(data));
    });
}

function inventoryCheck(qty){


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
                            }
                            console.log('hello');

                        })



                    });


                    } //end of else
            });
        })
    };
    
    
                        
          




// function whichProduct(){
//     inquirer.prompt({
//             name: "whichProduct",
//             type: "input",
//             message: "Which product would you like to purchase? Please select an id."
//         })
//         .then(function(productResponse){
//             var departmentDecision = departmentResponse.whichDepartment;
//             var productDecision = productResponse.whichProduct;
//             connection.query("SELECT * FROM products INNER JOIN departments ON departments.departmentID = deptID AND deptID = ? AND productID = ?", departmentDecision, productDecision, function(err, res) {
//                 if (err) throw err;
//                 if(res.length === 0){
//                     console.log('The selection is not valid. Please enter a product on the list.');
//                     whichProduct();
//                 } else {
//                     console.log('hello');
//                     // var data = [
//                     //     ['id', 'ProductName', 'Price']
//                     // ]
//                     // for(var i =0; i<res.length;i++){        
//                     //     data.push([res[i].productID, res[i].productName, res[i].price],);            
//                     // }        
//                     // console.log(table(data));
//                     // connection.end();
//                 }
//             });
//         });
// };





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
