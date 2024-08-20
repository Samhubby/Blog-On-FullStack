import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogService } from "../api/blogService";
import { useDispatch } from "react-redux";
import { addPostState } from "../store/postSlice";
import { ArrowRightIcon } from "lucide-react";

const HomePage = () => {
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getFeaturedBlog().then((response) => {
      dispatch(addPostState(response.data));
      setFeaturedBlog(response.data);
    });
  }, []);

  return (
    <div className="w-full mx-auto bg-[#C5D8D1]">
      <section className="bg-center bg-no-repeat bg-cover bg-[url('/homeBG.jpg')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Empowering Your Voice Through Blogging
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Welcome to Blog On, where we believe in the power of expression.
            Join us as we explore diverse topics, share insights, and engage
            with a community passionate about storytelling and knowledge
            sharing.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <Link
              to="/add-blogs"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-lg bg-[#f4c89b] hover:bg-[#F7BA7C] focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Start Blogging
              <ArrowRightIcon className="w-5 h-6 ms-2 " />
            </Link>
            <Link
              to="/all-blogs"
              className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-[#dde3de] focus:ring-4 focus:ring-gray-400"
            >
              Show Blogs
            </Link>
          </div>
        </div>
      </section>

      {featuredBlog && (
        <div className="flex flex-wrap mt-8  px-4  lg:px-0">
          <h2 className="w-full text-[#12263A] text-3xl font-bold ml-6">
            Featured Blogs
          </h2>
          {featuredBlog.slice(0, 3).map((blog, index) => (
            <div
              key={index}
              className="w-full lg:w-1/3 p-4 lg:p-6 flex flex-col justify-between"
            >
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  loading="lazy"
                  src={`${blog.coverImage}?w=300&h=200&auto=format,compress`}
                  className="h-48 w-full object-cover"
                  alt={blog.title}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{blog.description}</p>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="text-[#12263A] hover:text-blue-950"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
