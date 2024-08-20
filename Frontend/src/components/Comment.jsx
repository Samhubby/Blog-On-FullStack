import React, { useEffect, useState } from "react";
import { commentService } from "../api/commentService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addComment, clearComments } from "../store/commentSlice";
import { Button } from "./index";
import { useForm } from "react-hook-form";

const Comment = () => {
  const { id } = useParams();
  const comments = useSelector((state) => state.comment.comments);

  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const handleComment = (data) => {
    commentService.addComment(data, id).then((response) => {
      dispatch(addComment(response.data));
      reset();
    });
  };
  useEffect(() => {
    dispatch(clearComments());
    commentService.listComments(id).then((response) => {
      dispatch(addComment(response.data));
    });
  }, [id, dispatch]);
  return (
    <div>
      <section className="bg-[#F4EDEA]  py-3 lg:py-16 antialiased">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl lg:text-3xl font-bold text-gray-900 ">
              Comment ({comments.length})
            </h1>
          </div>
          <form className="mb-6" onSubmit={handleSubmit(handleComment)}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 ">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                placeholder="Write a comment..."
                required
                {...register("comment")}
              ></textarea>
            </div>
            <Button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg "
            >
              Post comment
            </Button>
          </form>

          {/* Comment 1 */}
          {comments &&
            comments.map((comment) => {
              if (!comment.createdBy) {
                return null; 
              }
              return (
                <article
                  key={comment._id}
                  className="p-6 text-base rounded-lg "
                >
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src={comment.createdBy.avatar}
                          alt="Michael Gough"
                        />
                        {comment.createdBy.fullName}
                      </p>
                      <p className="text-sm ">
                        <time
                          dateTime={comment.createdAt}
                          title={new Date(comment.createdAt).toDateString()}
                        >
                          {new Date(comment.createdAt).toDateString()}
                        </time>
                      </p>
                    </div>
                  </footer>
                  <p>{comment.comment}</p>
                </article>
              );
            })}

          {/* Add more comment articles as needed */}
        </div>
      </section>
    </div>
  );
};

export default Comment;
