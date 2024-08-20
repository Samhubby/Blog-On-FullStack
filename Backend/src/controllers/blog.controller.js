import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addBlog = async (req, res) => {
  try {
    const { title, content, description } = req.body;
    const localFilePath = req.file?.path;

    const coverImageURL = await uploadOnCloudinary(localFilePath);

    const blog = await Blog.create({
      title,
      content,
      coverImage: coverImageURL.url,
      description,
      createdBy: req.user._id,
    });

    if (!blog) throw new ApiError(500, "Failed to create blog");

    return res
      .status(200)
      .json(new ApiResponse(200, "Blog created Successfully", blog));
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiError(error.status, error.message));
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, content, description } = req.body;
    const blogID = req.params.id;
    const blog = await Blog.findById(blogID);
    if (!blog) throw new ApiError(404, "Blog not found");

    const localFilePath = req.file?.path;

    const coverImageURL = await uploadOnCloudinary(localFilePath);

    const response = await Blog.updateOne(
      { _id: blogID },
      { title, content, description, coverImage: coverImageURL.url }
    );

    if (!response) throw new ApiError(500, "Failed to update blog");
    const updatedBlog = await Blog.findById(blogID);
    return res
      .status(200)
      .json(new ApiResponse(200, "Blog updated successfully", updatedBlog));
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiError(error.status, error.message));
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogID = req.params.id;

    const result = await Blog.deleteOne({ _id: blogID });

    if (result.deletedCount === 0) {
      throw new ApiError(404, "Blog not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Blog deleted successfully"));
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiError(error.status, error.message));
  }
};

const getAllBlog = async (req, res) => {
  try {
    const allBlogs = await Blog.find({}).populate(
      "createdBy",
      "fullName avatar"
    );
    if (!allBlogs || allBlogs.length === 0)
      throw new ApiError(404, "Cannot find Blogs");
    return res
      .status(200)
      .json(new ApiResponse(200, "All Blogs Fetched", allBlogs));
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiError(error.status, error.message));
  }
};

const getBlog = async (req, res) => {
  try {
    const blogID = req.params.id;
    const blog = await Blog.findById(blogID).populate(
      "createdBy",
      "fullName avatar"
    );
    if (!blog) throw new ApiError(404, "Blog not found");
    return res
      .status(200)
      .json(new ApiResponse(200, "Blog fetched successfully", blog));
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(new ApiError(error.status, error.message));
  }
};

const getFeaturedBlog = async (req, res) => {
  try {
    const featuredBlog = await Blog.find({ featured: true })
      .populate("createdBy", "fullName avatar")
      .limit(3);

    if (!featuredBlog) throw new ApiError(404, "Blog not found");
    return res
      .status(200)
      .json(new ApiResponse(200, "Blog fetched successfully", featuredBlog));
  } catch (error) {
    res
      .status(error.status || 500)
      .json(new ApiError(error.status, error.message));
  }
};
export {
  addBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
  getBlog,
  getFeaturedBlog,
};
