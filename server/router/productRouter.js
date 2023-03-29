const express = require('express')
const formidable = require('express-formidable');

const { 
  newProduct, 
  getproductController, 
  productPhotoController, 
  getSingleProduct, 
  updateProduct, 
  deleteProduct, 
  productCateory,
  productFiltersController,
  searchProductController
} = require('../controller/productController')
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
router.get("/get-product/:slug", getSingleProduct);
//update existing product
router.put(
    "/update-product/:pid",
    // requireSignIn,
    // isAdmin,
    formidable(),
    updateProduct
  );
//delete rproduct
router.delete("/delete-product/:pid", deleteProduct);
//category wise product
router.get("/product-category/:slug", productCateory);
//filter product
router.post("/product-filters", productFiltersController);
//search product
router.get("/search/:keyword", searchProductController);

module.exports = router;