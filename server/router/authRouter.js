const express = require('express')
const {registerController} = require( '../controller/authController')

const router = express.Router() //router object

//register || method post
router.post('/register',registerController)

module.exports = router;