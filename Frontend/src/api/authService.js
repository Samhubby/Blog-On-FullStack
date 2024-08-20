import axios from "axios";
import config from "../config/config";

class AuthService {
  async checkAuth() {
    try {
      
      const response = await axios.get(`/api/authCheck`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export const authService = new AuthService();
