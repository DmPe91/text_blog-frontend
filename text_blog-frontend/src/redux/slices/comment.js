import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async () => {
    const { data } = await axios.get("/comments");
    return data;
  }
);
export const fetchPostComments = createAsyncThunk(
  "posts/fetchPostComments",
  async () => {
    const { data } = await axios.get("/posts/comments");
    return data;
  }
);

const initialState = {
  comments: {
    items: [],
    status: "loading",
  },
};
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    // получение последних 5 комментариев
    builder.addCase(fetchComments.pending, (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    });
    // получение комментариев конкретной статьи
    builder.addCase(fetchPostComments.pending, (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    });
    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    });
    builder.addCase(fetchPostComments.rejected, (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
