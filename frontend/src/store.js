import { configureStore } from "@reduxjs/toolkit";
import {
  getUserCartReducer,
  getUserWishlistReducer,
  userCartReducer,
  userProfileReducer,
  userReducer,
  userWishlistReducer,
} from "./reducer/user/userReducer";
import {
  addAndUpdateProductReviewReducer,
  getAllProductsReducer,
  getLatestProductsReducer,
  getProductReducer,
  getTopRatedProductsReducer,
  productReducer,
} from "./reducer/user/productReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    userProfile: userProfileReducer,
    getUserWishlist: getUserWishlistReducer,
    userWishlist: userWishlistReducer,
    getUserCart: getUserCartReducer,
    userCart: userCartReducer,
    product: productReducer,
    getAllProducts: getAllProductsReducer,
    getProduct: getProductReducer,
    getLatestProducts: getLatestProductsReducer,
    getTopRatedProducts: getTopRatedProductsReducer,
    productReview: addAndUpdateProductReviewReducer,
  },
});

export default store;
