const express = require('express')
const {registerController,loginController, testController} = require( '../controller/authController')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware')

const router = express.Router() //router object

//register || method post
router.post('/register',registerController)
router.post('/login',loginController)

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });
  

//text Routes

router.get("/test",requireSignIn,isAdmin, testController)

module.exports = router;