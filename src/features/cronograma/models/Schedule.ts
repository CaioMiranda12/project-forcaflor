import mongoose, { Schema, Document, models } from "mongoose";

export interface IActivity extends Document {
  title: string;
  description: string;
  dayOfWeek: string;
  time: string;
  location: string;
  instructor: string;
  type: string;
  color: string;
}

const ActivitySchema = new Schema<IActivity>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dayOfWeek: {
      type: String,
      enum: [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
      required: true,
    },
    time: { type: String, required: true },
    location: { type: String, required: true },
    instructor: { type: String, required: true },
    type: { type: String, required: true },
    color: { type: String, default: "#6B7280" },
  },
  { timestamps: true }
);

export const Activity =
  models.Activity || mongoose.model<IActivity>("Activity", ActivitySchema);
