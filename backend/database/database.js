import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `Database conntect successfully on URL : ${process.env.MONGODB_URI} `
    );
  } catch (error) {
    console.log(`MongoDB error : ${error.message}`);
  }
};

export default connectDatabase;
