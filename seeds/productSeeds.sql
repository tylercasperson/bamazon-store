DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;  
create table products (
	id INT NOT NULL AUTO_INCREMENT,
    productName varchar(100),
    deptID INT ,
    cost float(10,3),
    price float(10,3),
    quantityOnHand INT ,
    minLevel INT ,
    maxLevel INT ,
    PRIMARY KEY (id)
);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("Computer", 1, 100.32, 499.99, 25, 5, 50);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("xbox", 1, 50.25, 399.99, 100, 500);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("Super Mario Brothers", 1, 1000.84, 500000.00, 6, 3, 300);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("Mario Kart", 1, 500.00, 1299.99, 80, 10, 100);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("BlueNecklace", 4, 2.00, 59.99, 10, 2, 10);

INSERT INTO products (productName, deptID, cost, price, quantityOnHand, minLevel, maxLevel)
VALUES ("CrystalBlueRing", 4, 1.00, 29.99, 50, 10, 30);
