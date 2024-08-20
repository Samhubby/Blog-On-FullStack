import { model, Schema, Types } from "mongoose";
const blogSchema = Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    coverImage: {
      type: String,
      default:
        "https://mailrelay.com/wp-content/uploads/2018/03/que-es-un-blog-1.png",
    },
    description: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Blog = model("Blog", blogSchema);
