import { catechAsyncError } from "../middlewares/catchAsyncError.js";
import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";
import ApiFeatures from "../utils/apiFeatures.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

//----------------------admin controllers-----------------------------

//create product controller -- admin
export const createProductController = catechAsyncError(
  async (req, res, next) => {
    const user = await UserModel.findById(req.user._id);

    //get the data from the request body
    const {
      brand,
      title,
      description,
      gender,
      category,
      stock,
      action,
      size,
      color,
      mrp,
      price,
    } = req.body;

    let imagesArr = [];

    if (typeof req.body.images === "string") {
      imagesArr.push(req.body.images);
    } else {
      imagesArr = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < imagesArr.length; i++) {
      const result = await cloudinary.v2.uploader.upload(imagesArr[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;

    //create a new product
    const product = await ProductModel.create({
      images: req.body.images,
      brand,
      title,
      description,
      gender,
      category,
      stock,
      action,
      size,
      color,
      mrp,
      price,
      user: user._id,
    });

    return res.status(201).json({
      success: true,
      message: "product created successfully",
      product,
    });
  }
);

//update product controller -- admin
export const updateProductController = catechAsyncError(
  async (req, res, next) => {
    let product = await ProductModel.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // // Images Start Here
    // let images = [];

    // if (typeof req.body.images === "string") {
    //   images.push(req.body.images);
    // } else {
    //   images = req.body.images;
    // }

    // if (images !== null) {
    //   // Deleting Images From Cloudinary
    //   for (let i = 0; i < product.images.length; i++) {
    //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    //   }

    //   const imagesLinks = [];

    //   for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //       folder: "products",
    //     });

    //     imagesLinks.push({
    //       public_id: result.public_id,
    //       url: result.secure_url,
    //     });
    //   }

    //   req.body.images = imagesLinks;
    // }

    product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      success: true,
      message: "product updated successfully",
      product,
    });
  }
);

//delete product controller -- admin
export const deleteProductController = catechAsyncError(
  async (req, res, next) => {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("product not found", 400));
    }

    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    //delet product
    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  }
);

//----------------------user controllers-----------------------------

//get all products
export const getProductsController = catechAsyncError(
  async (req, res, next) => {
    const resultPerPage = 15;

    let apiFeature = new ApiFeatures(ProductModel.find(), req.query)
      .search()
      .filter();

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature = new ApiFeatures(ProductModel.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    products = await apiFeature.query;

    res.status(200).json({
      success: true,
      resultPerPage,
      filteredProductsCount,
      products,
    });
  }
);

//latest products
export const latestProductsController = catechAsyncError(
  async (req, res, next) => {
    const resultPerPage = 15;

    const apiFeature = new ApiFeatures(
      ProductModel.find().sort({ createdAt: -1 }),
      req.query
    ).pagination(resultPerPage);

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    res.status(200).json({
      success: true,
      resultPerPage,
      filteredProductsCount,
      products,
    });
  }
);

//top rated products
export const topRatedProductsController = catechAsyncError(
  async (req, res, next) => {
    const resultPerPage = 15;

    const apiFeature = new ApiFeatures(
      ProductModel.find().sort({ ratings: 1 }),
      req.query
    ).pagination(resultPerPage);

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    res.status(200).json({
      success: true,
      resultPerPage,
      filteredProductsCount,
      products,
    });
  }
);

//get single product
export const getSingleProductController = catechAsyncError(
  async (req, res, next) => {
    let product = await ProductModel.findById(req.params.id).populate();

    if (!product) {
      return next(new ErrorHandler("product not found", 400));
    }

    return res.status(200).json({
      success: true,
      product,
    });
  }
);

//add review on product
export const addReviewOnProductController = catechAsyncError(
  async (req, res, next) => {
    let product = await ProductModel.findById(req.params.id);
    const user = await UserModel.findById(req.user._id);

    const { rating, comment } = req.body;

    const review = {
      user: user._id,
      name: user.name,
      rating,
      comment,
    };

    if (!product) {
      return next(new ErrorHandler("product not found", 400));
    }
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
    });
  }
);
