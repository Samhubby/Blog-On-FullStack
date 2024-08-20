import { model, Schema, Types } from "mongoose";

const commentSchema = Schema(
  {
    comment: {
      type: String,
      require: true,
    },
    blog: {
      type: Types.ObjectId,
      ref: "Blog",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

export { Comment };
