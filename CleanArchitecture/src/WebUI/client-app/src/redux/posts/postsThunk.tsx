import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostClient } from "../../services/web-api-client";
import instance from "../../services/base-api-client";
export const handleGetAllPostData = createAsyncThunk(
  "posts/handleGetAllPostData",
  async () => {
    try {
      const client = new PostClient(undefined, instance());
      const data = await client.getAll();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
