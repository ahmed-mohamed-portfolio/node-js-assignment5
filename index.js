const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 3000

app.use(express.json())


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
*/


/*
CREATE TABLE Suppliers (
  SupplierID INT AUTO_INCREMENT PRIMARY KEY,
  SupplierName VARCHAR(255) NOT NULL,
  ContactNumber VARCHAR(50)
);
*/


/* 

CREATE TABLE Sales (
  SaleID int AUTO_INCREMENT PRIMARY KEY,
  ProductID int NOT NULL,
  QuantitySold int NOT NULL,
  SaleDate DATE NOT NULL,
    
  CONSTRAINT fk_sales_products FOREIGN KEY (ProductID) REFERENCES Products(ProductID)

);


*/

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "store"
})

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("database connected");
    }
})



//==========================================================================================================
// 2- Add a column “Category” to the Products table. (0.5 Grade)

//api : http://localhost:3000/addProductColumn/Category
app.post("/addProductColumn/:Category", (req, res) => {
    let { Category } = req.params
    connection.query(`ALTER TABLE Products ADD COLUMN ${Category} VARCHAR(255) NOT NULL;`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ message: "column added successfully" })

    })
})

//==========================================================================================================
//3- Remove the “Category” column from Products. (0.5 Grade)

//api : http://localhost:3000/deleteProductColumn/Category
app.delete("/deleteProductColumn/:Category", (req, res) => {
    let { Category } = req.params
    connection.query(`ALTER TABLE Products DROP COLUMN ${Category};`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ message: "column removed successfully" })

    })
})
//==========================================================================================================
//4- Change “ContactNumber” column in Suppliers to VARCHAR (15). (0.5 Grade)

//api : http://localhost:3000/modifySuppliersColumn/ContactNumber
app.patch("/modifySuppliersColumn/:SuppliersColumn", (req, res) => {
    let { SuppliersColumn } = req.params
    connection.query(`ALTER TABLE Suppliers MODIFY COLUMN ${SuppliersColumn} VARCHAR(15);`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ message: "column MODIFYed successfully" })

    })
})

//==========================================================================================================
//5- Add a NOT NULL constraint to ProductName. (0.5 Grade)

//api : http://localhost:3000/modifyProductsColumn/ProductName
app.patch("/modifyProductsColumn/:ProductsColumn", (req, res) => {
    let { ProductsColumn } = req.params
    connection.query(`ALTER TABLE Products MODIFY COLUMN ${ProductsColumn} VARCHAR(15) NOT NULL;`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ message: "column MODIFYed successfully" })

    })
})

//==========================================================================================================
/*6- Perform Basic Inserts: (0.5 Grade)
a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'.

b. Insert the following three products, all provided by 'FreshFoods':
i. 'Milk' with a price of 15.00 and stock quantity of 50.
ii. 'Bread' with a price of 10.00 and stock quantity of 30.
iii. 'Eggs' with a price of 20.00 and stock quantity of 40.

c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
 */



//API :http://localhost:3000/addSupplier
/*{
  "SupplierName":"FreshFoods",
  "ContactNumber":"01001234567"
}
*/
app.post("/addSupplier", (req, res) => {
    let { SupplierName, ContactNumber } = req.body

    connection.query(`INSERT INTO Suppliers(SupplierName, ContactNumber) VALUES ('${SupplierName}','${ContactNumber}')`, (err, result) => {
        if (err) {
            console.log(err);
            return
        } else if (result.affectedRows > 0) {
            res.json({ message: "Supplier added successfully" })
        } else {
            res.json({ message: "faild to add Supplier" })
        }
    })
})

//==========================


/*
API : http://localhost:3000/addProduct

{  
"ProductName":"Milk",  
"Price":"15.00",
"StockQuantity":"50",
"SupplierID":"2"
}*/
app.post("/addProduct", (req, res) => {
    let { ProductName, Price, StockQuantity, SupplierID } = req.body

    connection.query(`INSERT INTO Products(ProductName, Price, StockQuantity ,SupplierID) VALUES ('${ProductName}',${Price},${StockQuantity},${SupplierID})`, (err, result) => {
        if (err) {
            console.log(err);
            return
        } else if (result.affectedRows > 0) {
            res.json({ message: "product added successfully" })
        } else {
            res.json({ message: "faild to add product" })
        }
    })
})

//==========================
//api : http://localhost:3000/addSales
/*{
  
"QuantitySold":"2",  
"SaleDate":"2025-05-20",
"ProductID":"2"

} */
app.post("/addSales", (req, res) => {
    let { QuantitySold, SaleDate, ProductID } = req.body

    connection.query(`INSERT INTO Sales( QuantitySold, SaleDate, ProductID) VALUES (${QuantitySold},'${SaleDate}',${ProductID})`, (err, result) => {
        if (err) {
            console.log(err);
            return
        } else if (result.affectedRows > 0) {
            res.json({ message: "Sale added successfully" })
        } else {
            res.json({ message: "faild to add sale" })
        }
    })
})

//==========================
//==========================================================================================================
//7- Update the price of 'Bread' to 25.00. (0.5 Grade)

//api : http://localhost:3000/UpdatePriceBread/25.00
app.patch("/UpdatePriceBread/:PriceBread", (req, res) => {
    let { PriceBread } = req.params
    connection.query(`UPDATE Products SET Price='${PriceBread}' WHERE ProductName = 'Bread';`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }
        res.json({ message: "price updated successfully" })

    })
})
//==========================================================================================================
//8- Delete the product 'Eggs'. (0.5 Grade)

//api : http://localhost:3000/deleteProduct/Eggs
app.delete("/deleteProduct/:Product", (req, res) => {
    let { Product } = req.params
    connection.query(`DELETE FROM Products WHERE ProductName = '${Product}';`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ message: "product deleted successfully" })

    })
})

//==========================================================================================================
//9- Retrieve the total quantity sold for each product. (0.5 Grade)
//api : http://localhost:3000/quantitySold
app.get('/quantitySold', (req, res) => {
    connection.query(`SELECT Products.ProductName, SUM(Sales.QuantitySold) AS TotalQuantity FROM Sales 
    JOIN Products ON Sales.ProductID = Products.ProductID
    GROUP BY Products.ProductName;
`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })
})

//==========================================================================================================
//10-Get the product with the highest stock. (0.5 Grade)

//api : http://localhost:3000/highestStock
app.get('/highestStock', (req, res) => {
    connection.query(`SELECT ProductName, StockQuantity FROM Products
      WHERE StockQuantity = ( SELECT MAX(StockQuantity) FROM Products );`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })
})

//==========================================================================================================
// 11-Find suppliers with names starting with 'F'. (0.5 Grade)

//api : http://localhost:3000/startWithF
app.get('/startWithF', (req, res) => {
    connection.query(`SELECT * FROM Suppliers WHERE SupplierName LIKE 'F%';`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })
})


//==========================================================================================================
//12-Show all products that have never been sold. (0.5 Grade)

//api : http://localhost:3000/neverSold
app.get('/neverSold', (req, res) => {
    connection.query(`SELECT * FROM Products
    WHERE ProductID NOT IN (
    SELECT DISTINCT ProductID
    FROM Sales );`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })
})


//==========================================================================================================
// 13-Get all sales along with product name and sale date. (0.5 Grade)

//api : http://localhost:3000/getAllSales
app.get('/getAllSales', (req, res) => {
    connection.query(`SELECT Products.ProductName, Sales.QuantitySold, Sales.SaleDat FROM Sales
                 JOIN Products ON Sales.ProductID = Products.ProductID;`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })
})


//==========================================================================================================
//14-Create a user “store_manager” and give them SELECT, INSERT, and UPDATE permissions on all tables. (0.5 Grade)
// refrance :: https://www.geeksforgeeks.org/sql/sql-create-users/
// refrance :: https://www.w3resource.com/sql/database-security/create-users.php


//api : http://localhost:3000/createStoreManager/store_manager
app.post('/createStoreManager/:manager', (req, res) => {
    let {manager}=req.params
    connection.query(`CREATE USER '${manager}'@'localhost' IDENTIFIED BY '' `, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })


})


//api : http://localhost:3000/grandStoreManager/store_manager
app.post('/grandStoreManager/:grandManager', (req, res) => {
    let {grandManager}=req.params

    connection.query(`GRANT SELECT, INSERT, UPDATE ON store.* TO '${grandManager}'@'localhost'; `, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })

})



//==========================================================================================================
// 15-Revoke UPDATE permission from “store_manager”. (0.5 Grade)

//api : http://localhost:3000/revokeStoreManager/store_manager
app.post('/revokeStoreManager/:Manager', (req, res) => {
    let {Manager}=req.params

    connection.query(`REVOKE UPDATE ON store.* FROM '${Manager}'@'localhost';`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })

})


//==========================================================================================================

// 16-Grant DELETE permission to “store_manager” only on the Sales table. (0.5 Grade)

//api : http://localhost:3000/deleteStoreManager/store_manager
app.post('/deleteStoreManager/:Manager', (req, res) => {
    let {Manager}=req.params

    connection.query(`GRANT DELETE ON store.Sales TO '${Manager}'@'localhost';`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })

})
//==========================================================================================================



app.listen(port, () => console.log("server work at port 3000"));
