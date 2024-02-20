import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createReducer(initialState, {
  LoginUserRequest: (state) => {
    state.loading = true;
  },
  LoginUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload.user;
    state.message = action.payload.message;
    state.isAuthenticated = true;
  },
  LoginUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  RegisterUserRequest: (state) => {
    state.loading = true;
  },
  RegisterUserSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
    state.otp = action.payload.otp;
    state.isAuthenticated = false;
  },
  RegisterUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  RegisterUserVerifiedRequest: (state) => {
    state.loading = true;
  },
  RegisterUserVerifiedSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload.user;
    state.message = action.payload.message;
    state.isAuthenticated = true;
  },
  RegisterUserVerifiedFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload.user;
    state.message = action.payload.message;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LogoutUserRequest: (state) => {
    state.loading = true;
  },
  LogoutUserSuccess: (state, action) => {
    state.loading = false;
    state.user = null;
    state.message = action.payload.message;
    state.isAuthenticated = false;
  },
  LogoutUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },

  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const userProfileReducer = createReducer(initialState, {
  ProfileUpdateRequest: (state) => {
    state.loading = true;
  },
  ProfileUpdateSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  ProfileUpdateFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },

  PasswordUpdateRequest: (state) => {
    state.loading = true;
  },
  PasswordUpdateSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  PasswordUpdateFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },

  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const userWishlistReducer = createReducer(initialState, {
  UserWishlistRequest: (state) => {
    state.loading = true;
  },
  UserWishlistSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  UserWishlistFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const getUserWishlistReducer = createReducer(initialState, {
  GetUserWishlistRequest: (state) => {
    state.loading = true;
  },
  GetUserWishlistSuccess: (state, action) => {
    state.loading = false;
    state.wishlist = action.payload.wishlist;
  },
  GetUserWishlistFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const getUserCartReducer = createReducer(initialState, {
  GetUserCartRequest: (state) => {
    state.loading = true;
  },
  GetUserCartSuccess: (state, action) => {
    state.loading = false;
    state.cart = action.payload.cart;
  },
  GetUserCartFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const userCartReducer = createReducer(initialState, {
  UserCartRequest: (state) => {
    state.loading = true;
  },
  UserCartSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  UserCartFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
