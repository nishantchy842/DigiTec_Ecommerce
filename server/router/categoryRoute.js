const express = require('express')
const {createCategoryController, getAllCategory, updateCategory, deleteCategory} = require('../controller/categoryController')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/add-category',createCategoryController)
router.get('/category-list', getAllCategory)
//update category
router.put('/update-category/:id',updateCategory)
router.delete('/delete-category/:id',deleteCategory)

module.exports = router;