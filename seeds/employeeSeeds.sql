DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;    
CREATE TABLE employees (
	id INT NOT NULL AUTO_INCREMENT,
    employeeName VARCHAR(100),
    managerID INT,
    PRIMARY KEY (id) 
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
