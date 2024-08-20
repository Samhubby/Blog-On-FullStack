import React, { useEffect, useState } from "react";
import PostForm from "../components/postform/PostForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "../components/index";

const EditBlog = () => {
  const [post, setPost] = useState(null);
  const postData = useSelector((state) => state.post.postData);
  const postID = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedPost = postData.filter((post) => post._id === postID.id);
    setPost(fetchedPost);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  return <PostForm post={post[0]} />;
};

export default EditBlog;
