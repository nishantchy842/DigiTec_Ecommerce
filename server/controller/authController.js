const { hashPassword, comparePassword } = require("../helper/authHelper");
const users = require('../models/userModel')
const JWT = require('jsonwebtoken')

exports.registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body
    console.log(req.body)

    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
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
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in registration',
      error
    })
  }
}

//get user Details
exports.getUser = async(req,res)=>{
  try{
    const user = await users.findById(req.params.id)
    .select('name email phone address role')
    res.status(200).send({
      success:true,
      message:"Specfic user",
      user
    })
  }catch(error){
    res.status(500).send({
      success:false,
      message:"Error While getting details"
    })
  }
}



//Post login

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password"
      })
    }
    //check users
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in login",
      error
    })
  }
}

//update profile

exports.updateProfile = async (req, res) => {

  try {
    const { name, email, phone, address } = req.body

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !email:
        return res.status(500).send({ error: "email is Required" });
      case !phone:
        return res.status(500).send({ error: "phone is Required" });
      case !address:
        return res.status(500).send({ error: "address is Required" });
    }

    const profile = await users.findByIdAndUpdate(req.params.id,
      { name, email, phone, address},
      { new: true }
    )
    await profile.save()
    res.status(200).send({
      success: true,
      message: 'successfully profile updated',
      profile,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: 'error while updating profile'
    })
  }

}





//test controller
exports.testController = (req, res) => {
  res.send("protected route")
}