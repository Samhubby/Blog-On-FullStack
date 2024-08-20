import axios from "axios";

class User {
  async registerUser(data) {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    formData.append("email", data.email);
    formData.append("fullName", data.fullName);
    formData.append("password", data.password);
    try {
      const response = await axios.post(`/api/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async loginUser(data) {
    try {
      const response = await axios.post(`/api/login`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async logOut() {
    try {
      const response = await axios.get(`/api/logout`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async updateFullName(newFullName) {
    try {
      const response = await axios.patch(
        `/api/update-fullName`,
        { newFullName: newFullName },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async updatePassword(currentPassword, newPassword) {
    try {
      const response = await axios.patch(
        `/api/update-password`,
        { currentPassword: currentPassword, newPassword: newPassword },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async updateAvatar(data) {
    try {
      const formData = new FormData();
      formData.append("newAvatar", data[0]);
      const response = await axios.patch(`/api/update-avatar`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export const userService = new User();
