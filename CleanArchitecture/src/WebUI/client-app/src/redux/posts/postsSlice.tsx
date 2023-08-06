import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IPartnerList, IPostList } from "../../services/web-api-client";
import { handleGetAllPostData } from "./postsThunk";

const initialState: IPostList = {
  postDtos: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (_state: any, action: PayloadAction<any>) => {
      return (_state = action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      handleGetAllPostData.fulfilled,
      (_state: any, action: any) => {
        if (action.payload) {
          return (_state = action.payload);
        } else {
          return (_state = initialState);
        }
      }
    );
  },
});
export const { setPosts } = postsSlice.actions;
export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
