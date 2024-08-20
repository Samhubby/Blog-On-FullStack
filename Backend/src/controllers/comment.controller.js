import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const blogID = req.params.id;

    const responseComment = await Comment.create({
      comment,
      createdBy: req.user.id,
      blog: blogID,
    });
    const commentID = responseComment._id;
    const newComment = await Comment.findById(commentID).populate(
      "createdBy",
      "fullName avatar"
    );
    if (!responseComment) {
      throw new ApiError(500, "Failed to add comment");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Comment added successfully", newComment));
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiError(error.status, error.message));
  }
};

const getComments = async (req, res) => {
  try {
    const blogID = req.params.id;
    const comments = await Comment.find({ blog: blogID }).populate(
      "createdBy",
      "avatar fullName"
    );

    if (!comments) throw new ApiError(404, "No any comments");

    return res
      .status(200)
      .json(new ApiResponse(200, "Comments fetched", comments));
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiError(error.status, error.message));
  }
};
export { addComment, getComments };
