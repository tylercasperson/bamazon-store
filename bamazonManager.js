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
};

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
        goToStart();
    })
};

function addInventory(){
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
    
        inquirer.prompt({
            name: "specificProduct",
            type: "input",
            message: "What item would you like to add to inventory? Please select the id."
        })
        .then(function(thisOne){
            specificProduct(thisOne);
        })
    })
};
        
function specificProduct(thisProduct){
    var thisOne = thisProduct[Object.keys(thisProduct)[0]];
    connection.query("SELECT * FROM products WHERE productID =" + thisOne, function(err, res) {
        if(err) throw err;
        var data = [
            ['id', 'ProductName','Quantity', 'Price']
        ];
        for(var i =0; i<res.length;i++){        
            data.push([res[i].productID, res[i].productName, res[i].quantityOnHand, res[i].price]);            
        }    
        console.log();    
        console.log(table(data));

        inquirer.prompt({
            name: "receiveQty",
            type: "input",
            message: "How much inventory would you like to recieve?"
        })
        .then(function(qunatity){
            var qty = qunatity.receiveQty;
            var newQty = res[0].quantityOnHand + Number(qty); 
            connection.query("UPDATE products SET quantityOnHand =" + newQty + " WHERE productID=" + thisOne + ";", function(err, resUpdate) {
                if (err) throw err;
                connection.query("SELECT * FROM products WHERE productID =" + thisOne, function(err, res) {
                    if(err) throw err;
                    var data = [
                        ['id', 'ProductName','Quantity', 'Price']
                    ];
                    for(var i =0; i<res.length;i++){        
                        data.push([res[i].productID, res[i].productName, res[i].quantityOnHand, res[i].price]);            
                    }    
                    console.log();
                    console.log(qty + ") " + res[0].productName + "('s) have been received.");
                    console.log();
                    console.log(table(data));
                    goToStart();
                })
            })
        })
    });
};

function addProduct(){
    var answers = [];

    inquirer.prompt({
        name: "departmentName",
        type: "input",
        message: "What department does the new product belong in?"
    })
    .then(function(answer1){
        inquirer.prompt({
            name: "productName",
            type: "input",
            message: "What is the name of the product?"
        })
        .then(function(answer2){
            inquirer.prompt({
                name: "cost",
                type: "input",
                message: "What is the cost of the new product?"
            })
            .then(function(answer3){
                inquirer.prompt({
                    name: "price",
                    type: "input",
                    message: "What is the price of the new product?"
                })
                .then(function(answer4){
                    inquirer.prompt({
                        name: "quantity",
                        type: "input",
                        message: "What quantity should be received of the new product?"
                    })
                    .then(function(answer5){
                        inquirer.prompt({
                            name: "minLevel",
                            type: "input",
                            message: "What is the minimum inventory level for the new product?"
                        })
                        .then(function(answer6){
                            inquirer.prompt({
                                name: "maxLevel",
                                type: "input",
                                message: "What is the maximum inventory level for the new product?"
                            })
                            .then(function(answer7){
                                answers.push(Number(answer1.departmentName));
                                answers.push("'"+answer2.productName+"'");
                                answers.push(answer3.cost);
                                answers.push(answer4.price);
                                answers.push(answer5.quantity);
                                answers.push(answer6.minLevel);
                                answers.push(answer7.maxLevel);
                                connection.query("INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel) VALUES ("+answers[1]+", "+answers[0]+", "+answers[2]+", "+answers[3]+", "+answers[4]+", "+answers[5]+", "+answers[6]+"); ", function(err, resInsert) {
                                    if (err) throw err;
                                })

                                connection.query("SELECT * FROM products INNER JOIN departments ON departmentID = deptID WHERE productID=(SELECT MAX(productID) FROM products);", function(err, res) {
                                    if(err) throw err;
                                    var data = [
                                        ['id', 'Department', 'Product', 'Cost', 'Price', 'Quantity', 'MinLevel', 'MaxLevel']
                                    ];
                                    for(var i =0; i<res.length;i++){        
                                        data.push([res[i].productID, res[i].departmentName, res[i].productName, res[i].cost, res[i].price, res[i].quantityOnHand, res[i].minLevel, res[i].maxLevel]);            
                                    }    
                                    console.log();    
                                    console.log(table(data));
                                    goToStart();
                                })
                            })
                        })
                    })
                })
            })
        })  
    })
};

function showDepartments(){
    connection.query("SELECT * FROM departments",function(err, res){
        if(err) throw err;
        var data = [
            ['id', 'Deparment']
        ];
        for(var i =0; i<res.length;i++){        
            data.push([res[i].departmentID, res[i].departmentName]);            
        }    
        console.log();    
        console.log(table(data));
        addProduct();
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
            break;
            case '3':
                addInventory();
            break;
            case '4':
                showDepartments();
            break;
        };
    })
};
