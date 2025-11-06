import mongoose, { model, models } from "mongoose";

const CategorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true
  },
  color: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Category = models?.Category || model("Category", CategorySchema);
