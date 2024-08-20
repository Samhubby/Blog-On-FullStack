import axios from "axios";


class CommentService {
  async addComment(data, id) {
    try {
      const response = await axios.post(`/api/add-comment/${id}`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
  async listComments(id) {
    try {
      const response = await axios.get(`/api/comments/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export const commentService = new CommentService();
