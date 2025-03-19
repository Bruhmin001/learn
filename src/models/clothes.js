import mongoose from "mongoose";

const ClothesSchema = new mongoose.Schema({
  name: String,
  category : String,
  price: Number,
  branch : String
});

export default mongoose.models.Clothes || mongoose.model("Clothes", ClothesSchema);
