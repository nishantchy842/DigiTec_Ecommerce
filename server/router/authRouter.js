const express = require('express')
const {registerController,loginController} = require( '../controller/authController')

const router = express.Router() //router object

//register || method post
router.route('/register').post(registerController)
router.post('/login',loginController)

module.exports = router;