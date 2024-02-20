import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const productReducer = createReducer(initialState, {
  CreateProductRequest: (state) => {
    state.loading = true;
  },
  CreateProductSuccess: (state, action) => {
    state.loading = false;
    state.product = action.payload.product;
    state.message = action.payload.message;
  },
  CreateProductFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  UpdateProductRequest: (state) => {
    state.loading = true;
  },
  UpdateProductSuccess: (state, action) => {
    state.loading = false;
    state.product = action.payload.product;
    state.message = action.payload.message;
  },
  UpdateProductFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  DeleteProductRequest: (state) => {
    state.loading = true;
  },
  DeleteProductSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  DeleteProductFailure: (state, action) => {
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

export const getAllProductsReducer = createReducer(initialState, {
  GetAllProductsRequest: (state) => {
    state.loading = true;
  },
  GetAllProductsSuccess: (state, action) => {
    state.loading = false;
    state.productsCount = action.payload.productsCount;
    state.resultPerPage = action.payload.resultPerPage;
    state.filteredProductsCount = action.payload.filteredProductsCount;
    state.products = action.payload.products;
  },
  GetAllProductsFailure: (state, action) => {
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

export const getProductReducer = createReducer(initialState, {
  GetProductRequest: (state) => {
    state.loading = true;
  },
  GetProductSuccess: (state, action) => {
    state.loading = false;
    state.product = action.payload.product;
  },
  GetProductFailure: (state, action) => {
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

export const getLatestProductsReducer = createReducer(initialState, {
  GetLatestProductsRequest: (state) => {
    state.loading = true;
  },
  GetLatestProductsSuccess: (state, action) => {
    state.loading = false;
    state.products = action.payload.products;
  },
  GetLatestProductsFailure: (state, action) => {
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

export const getTopRatedProductsReducer = createReducer(initialState, {
  GetTopRatedProductsRequest: (state) => {
    state.loading = true;
  },
  GetTopRatedProductsSuccess: (state, action) => {
    state.loading = false;
    state.products = action.payload.products;
  },
  GetTopRatedProductsFailure: (state, action) => {
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

export const addAndUpdateProductReviewReducer = createReducer(initialState, {
  addAndUpdateProductReviewRequest: (state) => {
    state.loading = true;
  },
  addAndUpdateProductReviewSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  addAndUpdateProductReviewFailure: (state, action) => {
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
