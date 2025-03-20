import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
let isConnected = false;

export async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("connected");
  } catch (error) {
    console.error("connection failed:", error);
    process.exit(1);
  }
}
