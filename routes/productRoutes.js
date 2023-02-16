const express = require("express");
const {
  createproduct,
  getAllProducts,
  updateProduct,
  deleteProducts,
  singleProduct,
} = require("../controllers/productController");
const singleUpload = require("../middlewares/multer");
const router = express.Router();

//create product route
// router.route("/add/product").post(upload.single("productImg"), createproduct);
router.route("/add/product").post(singleUpload, createproduct); //multer use gareko xam so

//get all product
router.route("/products").get(getAllProducts);
// get single product
router.route("/single/products/:id").get(singleProduct);

//update products
router
  .route("/product/update/:id")
  // .put(upload.single("productImg"), updateProduct);
  .put(singleUpload, updateProduct); //multer use gareko xam so

//delete
router.route("/product/delete/:id").delete(deleteProducts);

module.exports = router;
