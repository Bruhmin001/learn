import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  branch: String,
  stock: Number
});

export default mongoose.models.Stock || mongoose.model("Stock", stockSchema);
