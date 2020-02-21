require ("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
const table = require('table').table

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
    optionsAvailable();
};

function goToStart(){
    inquirer.prompt({
        name: "goBack",
        type: "input",
        message: "Would you like to go back to the main options? Select 1 for yes."
    })
    .then(function(optionResponse){
        var goBackDecision = optionResponse.goBack;
        if (goBackDecision === "1"){
            optionsAvailable();
        } else {
            connection.end();
        }
    })
};

function optionsAvailable(){
    connection.query("SELECT * FROM options", function(err, res) {
        if (err) throw err; 
        
        var data = [
            ['id', 'Options']
        ]
        for(var i =0; i<res.length;i++){        
            data.push([res[i].optionID, res[i].menuOption]);
        }  
        console.log();      
        console.log(table(data));
        whichOption();
    });
};

function allProducts(){
    connection.query("SELECT * FROM products INNER JOIN departments on departmentID = deptID", function(err, res){
        if (err) throw err;
        var data = [
            ['id', 'Department', 'Product', 'Cost', 'Price', 'Quantity', 'MinLevel', 'MaxLevel']
        ];
        for(var i=0; i<res.length;i++){
            data.push([res[i].productID, res[i].departmentName, res[i].productName, "$" + res[i].cost, "$" + res[i].price, res[i].quantityOnHand, res[i].minLevel, res[i].maxLevel]);
        }
        console.log();
        var output = table(data);
        console.log(output);
        goToStart();
    })
}

function lowInventory(){
    connection.query("SELECT * FROM products WHERE quantityOnHand <= minLevel", function(err, res) {
        if (err) throw err;

        var data = [
            ['id', 'Product', 'Quantity', 'MinLevel', 'MaxLevel']
        ]
        for(var i=0; i<res.length;i++){
            data.push([res[i].productID, res[i].productName, res[i].quantityOnHand, res[i].minLevel, res[i].maxLevel])
        }
        console.log();
        console.log(table(data));
        //need a function
    })
}

function addInventory(){
    var newQty = res[0].quantityOnHand + qty;                   
    connection.query("UPDATE products SET quantityOnHand =" + newQty + " WHERE productID=" + productResponse[Object.keys(productResponse)[0]] + ";", function(err, resUpdate) {
        if (err) throw err;
        console.log();
        console.log(res[0].productName + " has been updated.");
        //function to show update inventory
    })
};

function addProduct(){
    inquirer.prompt({
        name: "productName",
        type: "input",
        message: "What is the name of the product?"
    })
    .then(function(name){
        inquirer.prompt({
            name: "cost",
            type: "input",
            message: "What is the cost of the new product?"
        })
    })
};



function whichOption(){
    inquirer.prompt({
        name: "whichOption",
        type: "input",
        message: "Which option would you like to select? Please enter the id."
    })
    .then(function(optionResponse){
        var optionDecision = optionResponse.whichOption;
        switch(optionDecision){
            case '1':
                allProducts();
            break;
            case '2':
                lowInventory();
                console.log("2");
            break;
            case '3':
                addInventory();
                console.log("3");
            break;
            case '4':
                addProduct();
                console.log("4");
            break;
        };
        
    })
    

};


// inquirer.prompt({
//     name: "whichDepartment",
//     type: "input",
//     message: "Which department would you like to see products in? Please select an id."
// })
// .then(function(departmentResponse){
//     var departmentDecision = departmentResponse.whichDepartment;
//     connection.query("SELECT * FROM products INNER JOIN departments ON departments.departmentID = deptID AND deptID = ?", departmentDecision, function(err, res) {
//         if (err) throw err;
    
//         if(res.length === 0){
//             console.log('The selection is not valid. Please enter a department on the list.');
//             whichDepartment();
//         } else {
//             readProduct(departmentDecision);