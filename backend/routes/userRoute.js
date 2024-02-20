import express from "express";
import {
  UserMeController,
  getUserCartProductsController,
  getUserWishlistProductsController,
  loginUserController,
  logoutUserController,
  registerUserController,
  registerUserVerfiyController,
  updateCartUserController,
  updateUserPasswordController,
  updateUserProfileController,
  updateWishlistUserController,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// user routes -----------

//register user
router.route("/register").post(registerUserVerfiyController);

//register user
router.route("/register/verified/:id").post(registerUserController);

//login user
router.route("/login").post(loginUserController);

//logout user
router.route("/logout").get(isAuthenticated, logoutUserController);

//user me
router.route("/me").get(isAuthenticated, UserMeController);

//update user password
router
  .route("/update/password")
  .put(isAuthenticated, updateUserPasswordController);

//update user profile
router
  .route("/update/profile")
  .put(isAuthenticated, updateUserProfileController);

//get user wishlist
router
  .route("/wishlist")
  .get(isAuthenticated, getUserWishlistProductsController);

//add and remove product from user wishlist
router
  .route("/wishlist/update/:id")
  .put(isAuthenticated, updateWishlistUserController);

//get user cart
router.route("/cart").get(isAuthenticated, getUserCartProductsController);

//add and remove product from user cart
router.route("/cart/update/:id").put(isAuthenticated, updateCartUserController);

// admin routes -----------

export default router;
