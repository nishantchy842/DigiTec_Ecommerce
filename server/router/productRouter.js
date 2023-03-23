const express = require('express')
const formidable = require('express-formidable');

const { newProduct, getproductController, productPhotoController } = require('../controller/productController')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/create-product',
// requireSignIn,
// isAdmin,
formidable(),
newProduct
)

router.get('/product',getproductController)
router.get('/product-photo/:pid',productPhotoController)

module.exports = router;