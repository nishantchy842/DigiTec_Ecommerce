const products = require('../models/productModel')

//create new product => /api/v1/product/new

exports.newProduct = async (req,res,next)=>{

   try{
    console.log(req.body)

    res.status(201).json({
        success:true,
    })

   }catch(error){

   }

  
}