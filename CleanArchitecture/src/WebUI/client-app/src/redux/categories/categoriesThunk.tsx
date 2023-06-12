import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryClient } from "../../services/web-api-client";
import instance from "../../services/base-api-client";

export const handleGetAllCategoryData = createAsyncThunk(
  "categories/handleGetAllCategoryData",
  async () => {
    try {
      const client = new CategoryClient(undefined, instance());
      const data = await client.getAll();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
