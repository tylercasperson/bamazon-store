DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;  
create table products (
	productID INT NOT NULL AUTO_INCREMENT,
    productName varchar(100) NOT NULL,
    deptID INT NOT NULL,
    cost float(10,3) NOT NULL,
    price float(10,3) NOT NULL,
    quantityOnHand INT,
    minLevel INT ,
    maxLevel INT ,
    PRIMARY KEY (productID)
);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("Computer", 1, 100.32, 499.99, 25, 5, 50);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("xbox", 1, 50.25, 399.99, 40, 100, 500);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("Super Mario Brothers", 1, 1000.84, 500000.00, 6, 3, 300);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("Mario Kart", 1, 500.00, 1299.99, 80, 10, 100);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("Blue Necklace", 2, 2.00, 59.99, 10, 2, 10);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("Crystal Blue Ring", 2, 1.00, 29.99, 50, 10, 30);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("Crystal", 2, 1.00, 299.99, 5, 10, 40);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("Ruby Ring", 2, 0.10, 99.99, 0, 20, 30);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("Bead Necklace", 2, 0.50, 159.99, 3, 10, 30);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("Toe ring", 2, 2.00, 300.00, 2, 1, 3);


USE bamazonDB;    
CREATE TABLE employees (
	employeeID INT NOT NULL AUTO_INCREMENT,
    employeeName VARCHAR(100) NOT NULL,
    managerID INT NOT NULL,
    PRIMARY KEY (employeeID) 
);
    
INSERT INTO employees(employeeName, managerID)
VALUES("Tyler", 1);

INSERT INTO employees(employeeName, managerID)
VALUES("Steve", 1);

INSERT INTO employees(employeeName, managerID)
VALUES("Bob", 1);

INSERT INTO employees(employeeName, managerID)
VALUES("Emily", 4);

INSERT INTO employees(employeeName, managerID)
VALUES("Eric", 4);

INSERT INTO employees(employeeName, managerID)
VALUES("Richard", 4);

USE bamazonDB;  
CREATE TABLE departments (
	departmentID int NOT NULL AUTO_INCREMENT,
    departmentName VARCHAR(50) NOT NULL,
    managerID INT NOT NULL,
    overhead_cost FLOAT(10,3),
    PRIMARY KEY (departmentID)
);

INSERT INTO departments (departmentName, managerID, overhead_cost)
VALUES ("Electronics", 1, 500.50);

INSERT INTO departments (departmentName, managerID, overhead_cost)
VALUES ("Jewlery", 4, 200.34);

USE bamazonDB;
CREATE TABLE options (
    optionID int NOT NULL AUTO_INCREMENT,
    menuOption VARCHAR(100) NOT NULL,
    lockID int,
    PRIMARY KEY (optionID)
);

INSERT INTO options (menuOption, lockID)
VALUES ("View Products for Sale", 1);

INSERT INTO options (menuOption, lockID)
VALUES ("View Low Inventory", 1);

INSERT INTO options (menuOption, lockID)
VALUES ("Add to Inventory", 1);

INSERT INTO options (menuOption, lockID)
VALUES ("Add New Product", 1);
