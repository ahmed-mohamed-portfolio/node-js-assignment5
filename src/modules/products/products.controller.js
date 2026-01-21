const express = require('express')
const router = express.Router()


const {addProductColumn, removeCategory, modefyProductColumn, addProduct, updatePriceBread, deleteProduct, totalQuantatySold, highestStock, neverSold, getAllSales} = require('../products/products.service.js')

// 2- Add a column “Category” to the Products table. (0.5 Grade)

//api : http://localhost:3000/addProductColumn/Category
router.post("/addProductColumn/:Category", addProductColumn)

//==========================================================================================================
//3- Remove the “Category” column from Products. (0.5 Grade)

//api : http://localhost:3000/deleteProductColumn/Category
router.delete("/deleteProductColumn/:Category",removeCategory )

//==========================================================================================================
//5- Add a NOT NULL constraint to ProductName. (0.5 Grade)

//api : http://localhost:3000/modifyProductsColumn/ProductName
router.patch("/modifyProductsColumn/:ProductsColumn", modefyProductColumn)
//==========================================================================================================

/*
API : http://localhost:3000/addProduct

{  
"ProductName":"Milk",  
"Price":"15.00",
"StockQuantity":"50",
"SupplierID":"2"
}*/
router.post("/addProduct", addProduct)

//==========================================================================================================
//7- Update the price of 'Bread' to 25.00. (0.5 Grade)

//api : http://localhost:3000/UpdatePriceBread/25.00
router.patch("/UpdatePriceBread/:PriceBread", updatePriceBread)
//==========================================================================================================
//8- Delete the product 'Eggs'. (0.5 Grade)

//api : http://localhost:3000/deleteProduct/Eggs
router.delete("/deleteProduct/:Product", deleteProduct)

//==========================================================================================================
//9- Retrieve the total quantity sold for each product. (0.5 Grade)
//api : http://localhost:3000/quantitySold
router.get('/quantitySold',totalQuantatySold)

//==========================================================================================================
//10-Get the product with the highest stock. (0.5 Grade)

//api : http://localhost:3000/highestStock
router.get('/highestStock', highestStock)


//==========================================================================================================
//12-Show all products that have never been sold. (0.5 Grade)

//api : http://localhost:3000/neverSold
router.get('/neverSold', neverSold)


//==========================================================================================================
// 13-Get all sales along with product name and sale date. (0.5 Grade)

//api : http://localhost:3000/getAllSales
router.get('/getAllSales',getAllSales )



module.exports = router