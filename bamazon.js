create database bamazon;
use bamazon;
create table productT (
	itemID integer,
    ProductName varchar(100),
    DeptID integer,
    Cost float(10,3),
    Price float(10,3),
    QuantityOnHand integer,
    MinLevel integer,
    MaxLevel integer,
    PrimaryKey (ItemID)
    );
INSERT INTO productT (ProductName, DeptID, Cost, Price, QuantityOnHand, MinLevel, MaxLevel)
Value(Computer, 1, 100.32, 499.99, 25, 5, 50),
Value(xbox, 1, 50.25, 399.99, 100, 500),
Value(Super Mario Brothers, 1, 1000.84, 500000.00, 6, 3, 300),
Value(Mario Kart, 1, 500.00, 1299.99, 80, 10, 100),
value(BlueNecklace, 4, 2.00, 59.99, 10, 2, 10),
value(CrystalBlueRing, 4, 1.00, 29.99, 50, 10, 30)
    
    
    
use bamazon;    
create table DepartmentT (
	DeptID integer,
    DepartmentName varchar(50),
    ManagerID integer,
    Overhead_cost float(10,3),
    PrimaryID(DeptID)
    );
INSERT INTO DeptartmentT (DepartmentName, ManagerID, Overhead_cost)
Value("Electronics", 1, 500.50),
Value("Jewlery", 4, 200.34);
    
    
use bamazon;    
create table EmployeeT (
	EmployeeID integer auto_increment,
    EmployeeName varchar(100),
    ManagerID integer,
    PrimaryKey(EmployeeID) 
    );
    
INSERT INTO EmployeeT(EmployeeName, ManagerID)
Value("Tyler", 1),
Value("Steve", 1),
Value("Bob", 1),
Value("Emily", 4),
Value("Eric", 4),
Value("Richard", 4);
