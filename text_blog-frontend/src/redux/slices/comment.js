import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const { data } = await axios.get("/comments");
    return data;
  }
);
export const fetchPostComments = createAsyncThunk(
  "comments/fetchPostComments",
  async (id) => {
    const { data } = await axios.get(`/comments/${id}`);
    return data;
  }
);

const initialState = {
  lastComments: {
    items: [],
    status: "loading",
  },
  postComments: {
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
      state.lastComments.items = [];
      state.lastComments.status = "loading";
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.lastComments.items = action.payload;
      state.lastComments.status = "loaded";
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.lastComments.items = [];
      state.lastComments.status = "error";
    });
    // получение комментариев конкретной статьи
    builder.addCase(fetchPostComments.pending, (state) => {
      state.postComments.items = [];
      state.postComments.status = "loading";
    });
    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.postComments.items = action.payload;
      state.postComments.status = "loaded";
    });
    builder.addCase(fetchPostComments.rejected, (state) => {
      state.postComments.items = [];
      state.postComments.status = "error";
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
