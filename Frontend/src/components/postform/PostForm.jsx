import React from "react";
import { Button, Input, RTE } from "../index";
import { useForm } from "react-hook-form";
import { blogService } from "../../api/blogService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPostState, updatePostState } from "../../store/postSlice.js";

const PostForm = ({ post }) => {
  const { register, handleSubmit, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      coverImage: post?.coverImage || "",
      description: post?.description || "",
    },
  });
  const navigate = useNavigate();
  const id = useParams();
  const dispatch = useDispatch();
  const [error, setError] = React.useState("");

  const addBlog = async (data) => {
    if (post) {
      blogService.updateBlog(data, id.id).then((response) => {
        if (!response.success) {
          setError(response.message);
        } else {
          dispatch(updatePostState(response.data));
          navigate(`/blog/${id.id}`);
        }
      });
    } else {
      blogService.addBlog(data).then((response) => {
        if (!response.success) {
          setError(response.message);
        } else {
          dispatch(addPostState(response.data));
          navigate(`/blog/${response?.data._id}`);
        }
      });
    }
  };

  return (
    <div className="py-12 bg-[#c5d8d1]">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            {error && (
              <p className="text-red-600 mt-8 text-xl text-center">{error}</p>
            )}
            <form method="POST" onSubmit={handleSubmit(addBlog)}>
              <div className="space-y-5">
                <Input
                  label="Title: "
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter your title"
                  {...register("title", { required: true })}
                />

                <RTE
                  label="Content :"
                  name="content"
                  control={control}
                  defaultValue={getValues("content")}
                />
                
                <Input
                  label="Cover Image: "
                  type="file"
                  name="coverImage"
                  id="coverImage"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("coverImage")}
                  required
                />
                <label
                  className="text-xl font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="description"
                >
                  Description:
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="border border-gray-300 rounded-md h-48 p-2 w-full"
                  {...register("description")}
                ></textarea>
              </div>

              <div className="flex p-1">
                <Button type="submit"  children={post ? "Update" : "Submit"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
