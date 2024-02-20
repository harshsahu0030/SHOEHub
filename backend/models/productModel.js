import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  brand: {
    type: String,
    required: [true, "Please enter the product brand"],
  },
  title: {
    type: String,
    required: [true, "Please enter the product title"],
  },
  description: {
    type: String,
    required: [true, "Please enter the product description"],
  },
  gender: {
    type: String,
    required: [true, "Please select the target gender"],
  },
  category: {
    type: String,
    required: [true, "Please select the product category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter the product stock"],
    default: 1,
    maxLength: 4,
  },
  action: {
    type: String,
    required: [true, "Please select the product action"],
  },
  size: {
    type: Number,
    required: [true, "Please select the product size"],
  },
  color: {
    type: String,
    required: [true, "Please select the product color"],
  },
  mrp: {
    type: Number,
    required: [true, "Please select the product mrp"],
  },
  price: {
    type: Number,
    required: [true, "Please select the product price"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);
