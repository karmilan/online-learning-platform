import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("error msg", error.message);
    // console.error("err", error);
    process.exit(1);
  }
};

export default connectDB;
