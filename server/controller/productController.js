const productModel = require('../models/productModel')
const categoryModel = require('../models/categoryModel')
const fs = require('fs')
const slugify = require('slugify')
//create new product => /api/v1/product/new

exports.newProduct = async (req, res, next) => {

  try {
    const { name, description, price, category, quantity, shipping } = req.fields
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

exports.getproductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });


    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "All product",
      products
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error: error.message,
      message: "error in getting product"
    })
  }
}
//get photo
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
// get single product
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category")
      .select("-photo")
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};
//upate product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
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

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

//delete product
exports.deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo")
    res.status(200).send({
      success: true,
      message: "Product deleted successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: true,
      error,
      message: 'error while deleting'
    })
  }
}
//get product by category

exports.productCateory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug })
    const products = await productModel.find({ category }).populate('category')
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: 'error in getting product'
    })
  }
}

// filters
exports.productFiltersController = async (req, res) => {
  try {
    const { checked } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    // if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

//search product

exports.searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// product list base on page
exports.productListController = async (req, res) => {
  try {
    var regexp = new RegExp('^' + req.query.search)
    // const skipStartPages = req.query.size * (req.query.page - 1)
    const page = req.params.page ? req.params.page : 1;
    let totalItem = await productModel.find().count()
    if (totalItem % req.query.size != 0) {
      totalItem = Math.ceil(totalItem / req.query.size)
    } else {
      totalItem = totalItem / req.query.size
    }
     const products = await productModel
        .find()
        .select("-photo")
        .skip((page - 1) * req.query.size)
        .limit(req.query.size)
        .sort({ createdAt: -1 });
    
    res.status(200).send({
      success: true,
      products,
      totalItem
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};