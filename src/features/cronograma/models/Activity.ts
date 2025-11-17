import mongoose, { Schema, Document, models } from "mongoose";

export interface IActivity extends Document {
  title: string;
  description: string;
  dayOfWeek: string;
  startHour: string;
  endHour: string;
  location: string;
  instructor: string;
}

const ActivitySchema = new Schema<IActivity>(
  {
    title: { type: String, required: true },
    description: { type: String },
    dayOfWeek: { type: String, required: true },
    startHour: { type: String, required: true },
    endHour: { type: String, required: true },
    location: { type: String },
    instructor: { type: String },
  },
  { timestamps: true }
);

export const Activity =
  models.Activity || mongoose.model<IActivity>("Activity", ActivitySchema);
