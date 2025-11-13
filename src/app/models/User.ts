import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "voluntario"],
    default: "voluntario",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = models.User || mongoose.model("User", userSchema);
