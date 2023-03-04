const express = require('express')
const {registerController,loginController, testController} = require( '../controller/authController')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware')

const router = express.Router() //router object

//register || method post
router.post('/register',registerController)
router.post('/login',loginController)

//text Routes

router.get("/test",requireSignIn,isAdmin, testController)

module.exports = router;