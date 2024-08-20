import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  comments: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.comments = [...action.payload];
      } else {
        state.comments.push(action.payload);
      }
    },
    clearComments: (state) => {
      state.comments = [];
    },
  },
});

export const { addComment, clearComments } = commentSlice.actions;

export default commentSlice.reducer;
