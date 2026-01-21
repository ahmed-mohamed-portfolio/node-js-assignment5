const express = require('express')
const router = express.Router()
const {changeSuppliersInfo, addSupplier, addSales, supplierStartWithF, createStoreManager, grandStoreManagaer, revokeStoreManager, deleteStoreManager} = require('../users/user.service.js')


//==========================================================================================================
//4- Change “ContactNumber” column in Suppliers to VARCHAR (15). (0.5 Grade)

//api : http://localhost:3000/modifySuppliersColumn/ContactNumber
router.patch("/modifySuppliersColumn/:SuppliersColumn",changeSuppliersInfo )


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
router.post("/addSupplier", addSupplier)


//==========================
//api : http://localhost:3000/addSales
/*{
  
"QuantitySold":"2",  
"SaleDate":"2025-05-20",
"ProductID":"2"

} */
router.post("/addSales", addSales)


//==========================================================================================================
// 11-Find suppliers with names starting with 'F'. (0.5 Grade)

//api : http://localhost:3000/startWithF
router.get('/startWithF', supplierStartWithF)



//==========================================================================================================
//14-Create a user “store_manager” and give them SELECT, INSERT, and UPDATE permissions on all tables. (0.5 Grade)
// refrance :: https://www.geeksforgeeks.org/sql/sql-create-users/
// refrance :: https://www.w3resource.com/sql/database-security/create-users.php


//api : http://localhost:3000/createStoreManager/store_manager
router.post('/createStoreManager/:manager',createStoreManager)


//api : http://localhost:3000/grandStoreManager/store_manager
router.post('/grandStoreManager/:grandManager', grandStoreManagaer)



//==========================================================================================================
// 15-Revoke UPDATE permission from “store_manager”. (0.5 Grade)

//api : http://localhost:3000/revokeStoreManager/store_manager
router.post('/revokeStoreManager/:Manager', revokeStoreManager)


//==========================================================================================================

// 16-Grant DELETE permission to “store_manager” only on the Sales table. (0.5 Grade)

//api : http://localhost:3000/deleteStoreManager/store_manager
router.post('/deleteStoreManager/:Manager', deleteStoreManager)
//==========================================================================================================



module.exports = router