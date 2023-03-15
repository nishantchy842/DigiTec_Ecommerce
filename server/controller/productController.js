const productModel  = require('../models/productModel')
const fs = require('fs')
const slugify = require('slugify')
//create new product => /api/v1/product/new

exports.newProduct = async (req,res,next)=>{

   try{
    const {name, description, price, category, quantity, shipping} =  req.fields
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get all product

exports.getproductController = async (req,res)=>{
    try{
        const products = await productModel.find({})
        res.status(200).send({
            success:true,
            counTotal: products.length,
            message:"All product" ,
            products     
          })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error:error.message,
            message:"error in getting product"
        })
    }
}

exports.productPhotoController = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.pid).select("photo");
      if (product.photo.data) {
        res.set("Content-type", product.photo.contentType);
        return res.status(200).send(product.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };
  