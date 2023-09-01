const express = require("express");
const ProductController = require("../controller/product");

const router = express.Router();

router
  .post("/products", ProductController.createProduct)
  .get("/", ProductController.displayProducts)
  .get("/products", ProductController.getproductsall)
  .get("/products/:id", ProductController.getproducts)
  .put("/products/:id", ProductController.updateProduct)
  .patch("/products/:id", ProductController.replaceProduct)
  .delete("/products/:id", ProductController.deleteProduct);

exports.routes = router;
