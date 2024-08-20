import React from "react";
import { blogService } from "../api/blogService";
import { Loader, Postcard } from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import { addPostState } from "../store/postSlice.js";
import { useLoaderData } from "react-router-dom";

export const allBlogsLoader = async () => {
  try {
    const response = await blogService.listBlogs();
    return response.data;
  } catch (error) {
    console.error("Failed to load blogs", error);
    return [];
  }
};

const AllBlogs = () => {
  const dispatch = useDispatch();
  const blogs = useLoaderData();
  

  React.useEffect(() => {
    if (blogs.length > 0) {
      dispatch(addPostState(blogs));
    }
  }, [blogs, dispatch]);

  if (!blogs) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No blogs available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap p-4 bg-[#F4EDEA] ">
      {blogs.map((blog) => (
        <div key={blog._id} className="p-2 mx-auto  sm:w-1/2 md:w-1/3 lg:w-1/3">
          <Postcard {...blog} />
        </div>
      ))}
    </div>
  );
};

export default AllBlogs;
