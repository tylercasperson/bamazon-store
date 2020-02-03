DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;  
CREATE TABLE departments (
	id int NOT NULL AUTO_INCREMENT,
    departmentName VARCHAR(50),
    managerID INT,
    overhead_cost FLOAT(10,3),
    PRIMARY KEY (id)
);

INSERT INTO deptartments (departmentName, managerID, overhead_cost)
VALUES ("Electronics", 1, 500.50);

INSERT INTO deptartments (departmentName, managerID, overhead_cost)
VALUES ("Jewlery", 4, 200.34);
