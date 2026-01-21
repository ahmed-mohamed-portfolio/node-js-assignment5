const connection = require('../../../src/database/connection.js')


const changeSuppliersInfo = (req, res) => {
    let { SuppliersColumn } = req.params
    connection.query(`ALTER TABLE Suppliers MODIFY COLUMN ${SuppliersColumn} VARCHAR(15);`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ message: "column MODIFYed successfully" })

    })
}


const addSupplier = (req, res) => {
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
}



const addSales = (req, res) => {
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
}




const supplierStartWithF = (req, res) => {
    connection.query(`SELECT * FROM Suppliers WHERE SupplierName LIKE 'F%';`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })
}




const createStoreManager =  (req, res) => {
    let {manager}=req.params
    connection.query(`CREATE USER '${manager}'@'localhost' IDENTIFIED BY '' `, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })

}


const grandStoreManagaer  =  (req, res) => {
    let {grandManager}=req.params

    connection.query(`GRANT SELECT, INSERT, UPDATE ON store.* TO '${grandManager}'@'localhost'; `, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })

}




const revokeStoreManager = (req, res) => {
    let {Manager}=req.params

    connection.query(`REVOKE UPDATE ON store.* FROM '${Manager}'@'localhost';`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })

}



const deleteStoreManager = (req, res) => {
    let {Manager}=req.params

    connection.query(`GRANT DELETE ON store.Sales TO '${Manager}'@'localhost';`, (err, result) => {
        if (err) {
            console.log(err);
            return
        }

        res.json({ result })

    })

}

module.exports = {
changeSuppliersInfo , 
addSupplier ,
addSales ,
supplierStartWithF , 
createStoreManager ,
grandStoreManagaer , 
revokeStoreManager ,
deleteStoreManager
    
}