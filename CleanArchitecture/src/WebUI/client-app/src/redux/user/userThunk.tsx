import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserClient } from "../../services/web-api-client";
import instance from "../../services/base-api-client";

export const handleGetUserData = createAsyncThunk(
  "user/handleGetUserData",
  async () => {
    try {
      const client = new UserClient(undefined, instance());
      const data = await client.getUserAccount();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
