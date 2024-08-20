import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../api/userService";
import { addPostState } from "../store/postSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./index";
import { Pencil } from "lucide-react";

const Profile = () => {
  const userData = useSelector((state) => state.auth.userData);
  const { handleSubmit, register } = useForm();
  const [isAvatarEdit, setIsAvatarEdit] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const dropDown = () => {
    setIsAvatarEdit(!isAvatarEdit);
  };

  const handleProfileForm = async (data) => {
    const { newAvatar, newFullName, currentPassword, newPassword } = data;

    try {
      if (newFullName && !currentPassword && !newPassword && !newAvatar) {
        const response = await userService.updateFullName(newFullName);
        if (response.success) {
          dispatch(addPostState(response.data));
          window.location.reload();
          toast.success("Full Name Updated Successfully");
        } else {
          toast.error(response.message);
        }
      } else if (currentPassword && newPassword && !newAvatar && !newFullName) {
        const response = await userService.updatePassword(currentPassword, newPassword);
        if (response.success) {
          toast.success("Password Updated Successfully");
        } else {
          toast.error(response.message);
        }
      } else if (newAvatar && !currentPassword && !newPassword && !newFullName) {
        const response = await userService.updateAvatar(newAvatar);
        if (response.success) {
          dispatch(addPostState(response.data));
          window.location.reload();
          toast.success("Avatar Updated Successfully");
        } else {
          toast.error(response.message);
        }
      } else {
        toast.error("Invalid form submission");
      }
    } catch (error) {
      setError("An error occurred while updating the profile");
      toast.error("An error occurred while updating the profile");
    }
  };

  return (
    <div className="flex p-5 justify-center items-center min-h-screen bg-[#DDE3DE]">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg">
        <h1 className="border-b pb-6 text-4xl font-semibold text-center">
          Welcome, {userData.fullName}
        </h1>
        <form onSubmit={handleSubmit(handleProfileForm)}>
          <div className="grid grid-cols-1 gap-8 pt-6">
            {/* Avatar Section */}
            <div className="flex justify-center items-center">
              <div className="relative">
                <img
                  src={userData.avatar}
                  alt="Avatar"
                  className="h-32 w-32 rounded-full border-2 border-gray-300 object-cover"
                />
                <button
                  type="button"
                  onClick={dropDown}
                  className="absolute bottom-0 right-0 rounded-full bg-[#12263A] p-2 text-white hover:bg-blue-950"
                >
                  {isAvatarEdit ? "Cancel" : <Pencil />}
                </button>
              </div>
            </div>
            {/* Dropzone Section */}
            {isAvatarEdit && (
              <div>
                <div className="flex items-center justify-center w-full">
                  <input
                    id="newAvatar"
                    name="newAvatar"
                    type="file"
                    {...register("newAvatar")}
                  />
                </div>
                <Button
                  type="submit"
                  className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white"
                  children="Change Avatar"
                />
              </div>
            )}

            {/* Username Section */}
            <div>
              <h2 className="text-2xl font-semibold">Account Settings</h2>
              <hr className="my-4" />
              <h3 className="text-2xl font-semibold">Full Name</h3>

              <div className="mt-4">
                <div>
                  <div className="relative flex overflow-hidden rounded-md border-2 mb-4  ">
                    <input
                      type="text"
                      id="newFullName"
                      name="newFullName"
                      placeholder="Your full name"
                      className="w-full p-2"
                      {...register("newFullName")}
                    />
                  </div>
                  <Button type="submit" children=" Change full name" />
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Password</h2>
              <hr className="my-4" />

              <div className="flex flex-col space-y-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm text-gray-500"
                  >
                    Current Password
                  </label>
                  <div className="relative flex overflow-hidden rounded-md border-2 transition ">
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      placeholder="***********"
                      className="w-full p-2"
                      {...register("currentPassword")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm text-gray-500"
                  >
                    New Password
                  </label>
                  <div className="relative flex overflow-hidden rounded-md border-2 transition ">
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      placeholder="***********"
                      className="w-full p-2"
                      {...register("newPassword")}
                    />
                  </div>
                </div>

                <Button type="submit" children=" Change Password" />

                {error && (
                  <p className="text-red-600 mt-8 text-center">{error}</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Profile;