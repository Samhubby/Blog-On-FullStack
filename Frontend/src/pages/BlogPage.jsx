import React from "react";
import { Blog, Comment } from "../components/index";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const BlogPage = () => {
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.status);
  return (
    <div>
      <Blog />
      {!authStatus && (
        <h2 className="w-full bg-[#F4EDEA] text-[#12263A] pb-3 text-3xl font-bold flex justify-center">
          <Link to="/login" state={{ from: location }} className="underline">
            Log In
          </Link>
          &nbsp;to Comment
        </h2>
      )}

      {authStatus && <Comment />}
    </div>
  );
};

export default BlogPage;
