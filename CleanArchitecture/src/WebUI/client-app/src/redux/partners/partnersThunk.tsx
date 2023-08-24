import { createAsyncThunk } from "@reduxjs/toolkit";
import { PartnerClient } from "../../services/web-api-client";
import instance from "../../services/base-api-client";
export const handleGetAllPartnerData = createAsyncThunk(
  "partners/handleGetAllPartnerData",
  async () => {
    try {
      const client = new PartnerClient(undefined, instance());
      const data = await client.getAll();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
