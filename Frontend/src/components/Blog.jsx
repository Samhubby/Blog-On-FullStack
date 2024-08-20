import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { blogService } from "../api/blogService";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { Button, Loader } from "./index";
import { deletePostState } from "../store/postSlice";

const Blog = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState();
  const [isCreator, setIsCreator] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    blogService.getBlog(id).then((response) => {
      const fetchedBlog = response.data;
      setBlog(fetchedBlog);

      if (userData && fetchedBlog.createdBy?._id === userData?._id) {
        setIsCreator(true);
      }
    });
    window.scrollTo(0, 0);
  }, [id, userData]);
  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  const deleteBlog = async () => {
    const response = await blogService.deleteBlog(id);
    if (response.success) {
      dispatch(deletePostState({ id }));
      navigate("/all-blogs");
    }
  };
  return (
    <div className="bg-[#F4EDEA] antialiased min-h-screen">
      <main className="pt-8 pb-10 lg:pt-10  lg:pb-16">
        <div className="px-4 mx-auto max-w-screen-lg">
          <article className="prose prose-lg mx-auto">
            <header className="mb-8">
              <div className="flex items-center justify-between mb-6 ">
                <address className="flex items-center">
                  <img
                    className="mr-4 w-16 h-16 rounded-2xl "
                    src={blog.createdBy.avatar}
                    alt={blog.createdBy.fullName}
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      className="text-xl font-semibold text-gray-900"
                    >
                      {blog.createdBy.fullName}
                    </a>
                    <p className="text-sm ">
                      <time
                        dateTime={blog.createdAt}
                        title={new Date(blog.createdAt).toDateString()}
                      >
                        {new Date(blog.createdAt).toDateString()}
                      </time>
                    </p>
                  </div>
                </address>
                {isCreator && (
                  <div className="flex space-x-3">
                    <Link to={`/edit-blog/${id}`}>
                      <Button>Edit</Button>
                    </Link>
                    <button
                      onClick={deleteBlog}
                      className="bg-red-500 px-4 py-2 rounded-lg font-bold text-white"
                    >
                      DELETE
                    </button>
                  </div>
                )}
              </div>
              <h1 className="text-4xl font-extrabold leading-tight">
                {blog.title}
              </h1>
              <hr className=" h-0.5 mx-auto my-4 bg-[#12263A] border-0 rounded" />
            </header>

            <div className="prose dark:prose-invert">{parse(blog.content)}</div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default Blog;
