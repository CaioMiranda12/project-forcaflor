import mongoose, { Schema, Document, models } from "mongoose";

export interface IPost extends Document {
  title: string;
  excerpt: string;
  content: string;
  category: mongoose.Schema.Types.ObjectId;
  image?: string;
  status: "published" | "draft" | "scheduled";
  author: string;
  featured: boolean;
  publishDate: Date | null;
  lastModified: Date;
  lastModifiedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String, default: null },
    status: {
      type: String,
      enum: ["published", "draft", "scheduled"],
      default: "draft",
    },
    author: { type: String, required: true },
    featured: { type: Boolean, default: false },
    publishDate: { type: Date, default: null },
    lastModified: { type: Date, default: Date.now },
    lastModifiedBy: { type: String, default: null },
  },
  { timestamps: true }
);

// Exemplo de virtual para facilitar o frontend
PostSchema.virtual("statusLabel").get(function (this: IPost) {
  switch (this.status) {
    case "published":
      return "Publicado";
    case "draft":
      return "Rascunho";
    case "scheduled":
      return "Agendado";
    default:
      return "";
  }
});

export const Post = models.Post || mongoose.model<IPost>("Post", PostSchema);
