import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserClient } from "../../services/web-api-client";
import instance from "../../services/base-api-client";

export const handleGetAllUserData = createAsyncThunk(
  "users/handleGetAllUserData",
  async () => {
    try {
      const client = new UserClient(undefined, instance());
      const data = await client.getAllUserAccount();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
