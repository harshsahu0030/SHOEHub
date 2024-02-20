import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";
import {
  addReviewOnProductController,
  createProductController,
  deleteProductController,
  getProductsController,
  getSingleProductController,
  latestProductsController,
  topRatedProductsController,
  updateProductController,
} from "../controllers/productController.js";

const router = express.Router();

// admin routes -----------

//create product
router
  .route("/admin/product/create")
  .post(isAuthenticated, authorizeRoles("admin"), createProductController);

//update and delete product
router
  .route("/admin/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProductController)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProductController);

// user routes -----------

//get all products
router.route("/products").get(getProductsController);

// get single product
router.route("/product/:id").get(getSingleProductController);

//add and update review from product
router
  .route("/product/review/:id")
  .put(isAuthenticated, addReviewOnProductController);

//api features
//get latest products
router.route("/products/latest").get(latestProductsController);
router.route("/products/toprated").get(topRatedProductsController);

export default router;
