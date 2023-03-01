 const { hashPassword } =require("../helper/authHelper");
 const users = require('../models/userModel')
 
exports.registerController = async(req,res) =>{
    try{
        const {name,email,password,phone,address,answer}=req.body
        console.log(req.body)

        //validations
    if (!name) {
        return res.send({ error: "Name is Required" });
      }
      if (!email) {
        return res.send({ message: "Email is Required" });
      }
      if (!password) {
        return res.send({ message: "Password is Required" });
      }
      if (!phone) {
        return res.send({ message: "Phone no is Required" });
      }
      if (!address) {
        return res.send({ message: "Address is Required" });
      }
      if (!answer) {
        return res.send({ message: "Answer is Required" });
      }
      //check user
      const exisitingUser = await users.findOne({ email });
      // exisiting user
      if (exisitingUser) {
        return res.status(200).send({
          success: false,
          message: "Already Register please login",
        });
      }
      //Register user
      const hashedPassword = await hashPassword(password)
      //save
    const user = await new users({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
        answer,
      }).save();
  
      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
      });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in registration',
            error
        })
    }
}