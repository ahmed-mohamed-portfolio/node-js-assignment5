

const connection = require('../../../src/database/connection.js')




const addProductColumn = (req, res) => {
    let { Category } = req.params
    connection.query(`ALTER TABLE Products ADD COLUMN ${Category} VARCHAR(255) NOT NULL;`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ message: "column added successfully" })

    })
}





const removeCategory = (req, res) => {
    let { Category } = req.params
    connection.query(`ALTER TABLE Products DROP COLUMN ${Category};`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ message: "column removed successfully" })

    })
}




const modefyProductColumn = (req, res) => {
    let { ProductsColumn } = req.params
    connection.query(`ALTER TABLE Products MODIFY COLUMN ${ProductsColumn} VARCHAR(15) NOT NULL;`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ message: "column MODIFYed successfully" })

    })
}





const addProduct = (req, res) => {
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
}




const updatePriceBread = (req, res) => {
    let { PriceBread } = req.params
    connection.query(`UPDATE Products SET Price='${PriceBread}' WHERE ProductName = 'Bread';`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }
        res.json({ message: "price updated successfully" })

    })
}



const deleteProduct = (req, res) => {
    let { Product } = req.params
    connection.query(`DELETE FROM Products WHERE ProductName = '${Product}';`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ message: "product deleted successfully" })

    })
}



const totalQuantatySold =  (req, res) => {
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
}




const highestStock = (req, res) => {
    connection.query(`SELECT ProductName, StockQuantity FROM Products
      WHERE StockQuantity = ( SELECT MAX(StockQuantity) FROM Products );`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })
}



const neverSold = (req, res) => {
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
}



const getAllSales = (req, res) => {
    connection.query(`SELECT Products.ProductName, Sales.QuantitySold, Sales.SaleDat FROM Sales
                 JOIN Products ON Sales.ProductID = Products.ProductID;`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })
}




module.exports = {
    addProductColumn,
    removeCategory,
    modefyProductColumn,
    addProduct,
    updatePriceBread,
    deleteProduct,
    totalQuantatySold,
    highestStock,
    neverSold,
    getAllSales

}