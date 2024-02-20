import { catechAsyncError } from "../middlewares/catchAsyncError.js";
import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { generateToken } from "../utils/genrateToken.js";
import cloudinary from "cloudinary";
import { sendMail } from "../utils/sendMail.js";
import { optGenerate } from "../utils/optGenrate.js";
import OtpModel from "../models/otpModel.js";

//register verify user controller
export const registerUserVerfiyController = catechAsyncError(
  async (req, res, next) => {
    const { email } = req.body;

    let user = await UserModel.findOne({ email });

    if (user) {
      return next(new ErrorHandler("user already exist.. please login", 400));
    }

    const otpNumber = await optGenerate();

    const subject = "Email Verification";

    const text = `Email Verification - ${otpNumber}`;

    // email, subject, text
    await sendMail(req.body.email, subject, text);

    const otp = await OtpModel.create({
      otp: otpNumber,
      expire: new Date(Date.now() + 30 * 60 * 1000),
    });

    return res.status(200).json({
      success: true,
      message: `OTP successfully send to email - ${req.body.email}`,
      otp,
    });
  }
);

//register user controller
export const registerUserController = catechAsyncError(
  async (req, res, next) => {
    const optId = await OtpModel.findById(req.params.id);
    const { email, avatar, otp } = req.body;

    if (parseInt(otp) !== parseInt(optId.otp)) {
      return next(new ErrorHandler("Invalid OTP", 400));
    }

    if (parseInt(optId.expire) < Date.now()) {
      return next(new ErrorHandler("Invalid OTP", 400));
    }

    let user = await UserModel.findOne({ email });

    if (user) {
      return next(new ErrorHandler("user already exist.. please login", 400));
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "users",
      width: 150,
      crop: "scale",
    });

    (req.body.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }),
      (user = await UserModel.create(req.body));

    generateToken(user, 201, res, "user register successfully");

    const subject = "Thank your for registering on Shoehub";

    const text = `Thank your ${req.body.name} for registering on Shoehub`;

    // email, subject, text
    await sendMail(req.body.email, subject, text);
  }
);

//login user controller
export const loginUserController = catechAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please fill the inputs to login", 400));
  }

  let user = await UserModel.findOne({ email });

  if (!user) {
    return next(
      new ErrorHandler("user not exist.. please resgister first", 400)
    );
  }

  const comparePassword = await user.matchPassword(password);

  if (!comparePassword) {
    return next(new ErrorHandler("Invalid email and password", 400));
  }

  generateToken(user, 200, res, "user login successfully");
});

//logout user controller
export const logoutUserController = catechAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "logout successfully",
    });
});

//update user password controller
export const updateUserPasswordController = catechAsyncError(
  async (req, res, next) => {
    const user = await UserModel.findById(req.user._id);

    const isPasswordMatched = await user.matchPassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save({ validateBeforeSave: false });

    generateToken(user, 200, res, "user password updated successfully");
  }
);

//user me
export const UserMeController = catechAsyncError(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);

  return res.status(200).json({
    success: true,
    user,
  });
});

//update user profile controller
export const updateUserProfileController = catechAsyncError(
  async (req, res, next) => {
    let user = await UserModel.findById(req.user._id);

    if (req.body.avatar !== "") {
      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      req.body.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    } else {
      req.body.avatar = {
        public_id: user.avatar.public_id,
        url: user.avatar.url,
      };
    }

    user = await UserModel.findByIdAndUpdate(user._id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    generateToken(user, 200, res, "user prfile updated successfully");
  }
);

//get user wishlist products
export const getUserWishlistProductsController = catechAsyncError(
  async (req, res, next) => {
    const user = await UserModel.findById(req.user._id).populate("wishlist");

    return res.status(200).json({
      success: true,
      wishlist: user.wishlist,
    });
  }
);

//add and remove product from wishlist controller
export const updateWishlistUserController = catechAsyncError(
  async (req, res, next) => {
    const user = await UserModel.findById(req.user._id);
    const product = await ProductModel.findById(req.params.id);

    let index = -1;

    if (user.wishlist.includes(product._id)) {
      //remove the product from array
      index = user.wishlist.indexOf(product._id);
      user.wishlist.splice(index, 1);

      await user.save({ validateBeforeSave: false });

      return res.status(200).json({
        success: true,
        message: "Remove product from wishlist successfully",
      });
    } else {
      //push product in wishlist array
      user.wishlist.push(product._id);

      await user.save({ validateBeforeSave: false });

      return res.status(200).json({
        success: true,
        message: "Add product in wishlist successfully",
      });
    }
  }
);

//get user cart products
export const getUserCartProductsController = catechAsyncError(
  async (req, res, next) => {
    const user = await UserModel.findById(req.user._id).populate("cart");

    return res.status(200).json({
      success: true,
      cart: user.cart,
    });
  }
);

//add and remove product from cart controller
export const updateCartUserController = catechAsyncError(
  async (req, res, next) => {
    const user = await UserModel.findById(req.user._id);
    const product = await ProductModel.findById(req.params.id);

    let index = -1;

    if (user.cart.includes(product._id)) {
      //remove the product from array
      index = user.cart.indexOf(product._id);
      user.cart.splice(index, 1);

      await user.save({ validateBeforeSave: false });

      return res.status(200).json({
        success: true,
        message: "Remove product from Cart successfully",
      });
    } else {
      //push product in wishlist array
      user.cart.push(product._id);

      await user.save({ validateBeforeSave: false });

      return res.status(200).json({
        success: true,
        message: "Add product in Cart successfully",
      });
    }
  }
);
