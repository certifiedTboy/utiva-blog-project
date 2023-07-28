import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: null,
};

export const blogSlice = createSlice({
  initialState,
  name: "blogSlice",
  reducers: {
    clearBlog: () => initialState,
    setBlog: (state, action) => {
      state.blog = action.payload;
    },
  },
});

export default blogSlice.reducer;

export const { setBlog, clearBlog } = blogSlice.actions;
