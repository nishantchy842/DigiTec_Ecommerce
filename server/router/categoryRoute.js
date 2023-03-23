const express = require('express')
const {createCategoryController, getAllCategory} = require('../controller/categoryController')

const router = express.Router()

router.post('/add-category',createCategoryController)
router.get('/category-list', getAllCategory)

module.exports = router;