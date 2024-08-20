import axios from "axios";


class BlogService {
  async addBlog(post) {
    try {
      const formData = new FormData();
      formData.append("coverImage", post.coverImage[0]);
      formData.append("title", post.title);
      formData.append("content", post.content);
      formData.append("description", post.description);
      const response = await axios.post(
        `/api/add-blogs`,
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async updateBlog(post, id) {
    try {
      const formData = new FormData();
      formData.append("coverImage", post.coverImage[0]);
      formData.append("title", post.title);
      formData.append("content", post.content);
      formData.append("description", post.description);
      const response = await axios.patch(
        `/api/edit-blog/${id}`,
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async listBlogs() {
    const response = await axios.get(`/api/all-blogs`);
    return response.data;
  }

  async getBlog(id) {
    try {
      const response = await axios.get(`/api/blog/${id}`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
  async getFeaturedBlog() {
    try {
      const response = await axios.get(`/api/blogs/featuredBlog`);

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async deleteBlog(id) {
    try {
      const response = await axios.get(`/api/delete-blog/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export const blogService = new BlogService();
