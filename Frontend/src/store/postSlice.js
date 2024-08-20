import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postData: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPostState: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.postData = [ ...action.payload];
      } else {
        state.postData = [action.payload];
      }
    },
    updatePostState: (state, action) => {
      const updatedBlog = action.payload;
      const index = state.postData.findIndex(
        (blog) => blog._id === updatedBlog._id
      );

      if (index !== -1) {
        state.postData[index] = updatedBlog;
      }
    
    },
    deletePostState: (state, action) => {
      const postIdToDelete = action.payload.id;
      state.postData = state.postData.filter(
        (post) => post._id !== postIdToDelete
      );
    },
  },
});

export const { addPostState, deletePostState, updatePostState } =
  postSlice.actions;

export default postSlice.reducer;
