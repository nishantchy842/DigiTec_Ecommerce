const express = require('express')
const {newPorduct} = require('../controller/productController')

const router = express.Router() //router object

//product method post
router.route('/product/new').post(newPorduct)

module.exports = router