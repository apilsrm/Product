const express = require("express");
const {
  createproduct,
  getAllProducts,
  updateProduct,
  deleteProducts,
} = require("../controllers/productController");
const upload = require("../file/upload");
const singleUpload = require("../middlewares/multer");
const router = express.Router();

//create product route
router.route("/add/product").post(singleUpload, createproduct);
//get all product
router.route("/products").get(getAllProducts);
//update products
router.route("/product/update/:id").put(singleUpload, updateProduct);
// router
//   .route("/product/update/:id")
//   .put(upload.single("productImg"), updateProduct);

//delete
router.route("/product/delete/:id").delete(deleteProducts);

module.exports = router;
