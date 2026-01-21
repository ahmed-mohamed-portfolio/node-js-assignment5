
const express = require('express')
const app = express()
const productRouter = require('./src/modules/products/products.controller.js')
const userRouter = require('./src/modules/users/user.controller.js')

const port = 3000

app.use(express.json())
app.use(productRouter)
app.use(userRouter)


/*
//==========================================================================================================
1- Create the required tables for the retail store database based on the tables structure and relationships. (0.5 Grade)

CREATE DATABASE store;

CREATE TABLE Products (
  ProductID int AUTO_INCREMENT PRIMARY KEY,
  ProductName varchar(255) NOT NULL,
  Price DECIMAL(10,2) NOT NULL,
  StockQuantity int NOT NULL,
  SupplierID int,

  CONSTRAINT fk_products_Suppliers FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);



CREATE TABLE Suppliers (
  SupplierID INT AUTO_INCREMENT PRIMARY KEY,
  SupplierName VARCHAR(255) NOT NULL,
  ContactNumber VARCHAR(50)
);





CREATE TABLE Sales (
  SaleID int AUTO_INCREMENT PRIMARY KEY,
  ProductID int NOT NULL,
  QuantitySold int NOT NULL,
  SaleDate DATE NOT NULL,
    
  CONSTRAINT fk_sales_products FOREIGN KEY (ProductID) REFERENCES Products(ProductID)

);



//==========================================================================================================

*/


app.listen(port, () => console.log("server work at port 3000"));
