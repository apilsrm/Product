const Product = require("../models/product");
// const cloudinary = require("cloudinary");
const getDataUri = require("../utils/datauri");

exports.createproduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      category,
      SKU,
      manufacturer,
      ratings,
      IsInStock,
      price,
    } = req.body;

    let file;
    if (req.file) {
      file = req.file;
    } else {
      return res.status(400).json({
        success: false,
        message: "file is not upload",
      });
    }

    if (
      !productName ||
      !description ||
      !category ||
      !SKU ||
      !manufacturer ||
      !ratings ||
      !IsInStock ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "filled must be filled!",
      });
    }

    const fileUri = getDataUri(file);
    // const myCloud = await cloudinary.v2.uploade.uploade(fileUri.content, {
    //   folder: "productImg",
    // });

    const product = await Product.create({
      productName,
      description,
      category,
      SKU,
      manufacturer,
      ratings,
      IsInStock,
      price,
      productImg: file,
      // productImg: {
      //   public_id: myCloud.public_id,
      //   url: myCloud.secure_url,
      // },
    });
    res.status(201).json({
      success: true,
      message: "product create successfully!",
      product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//getProduct
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "product not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "product get successfully!",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update
exports.updateProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      category,
      SKU,
      manufacturer,
      ratings,
      IsInStock,
      price,
    } = req.body;
    let file;
    if (req.file) {
      file = req.file;
    } else {
      return res.status(400).json({
        success: false,
        message: "file was not upload",
      });
    }
    const productId = req.params.id;
    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }
    if (
      !productName ||
      !description ||
      !category ||
      !SKU ||
      !manufacturer ||
      !ratings ||
      !IsInStock ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "Fields must be filled!",
      });
    }
    product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productName,
        description,
        category,
        SKU,
        manufacturer,
        ratings,
        IsInStock,
        price,
        productImg: file,
      },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete
exports.deleteProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found!",
      });
    }
    await product.remove();
    res.status(200).json({
      success: true,
      message: "product remove successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
