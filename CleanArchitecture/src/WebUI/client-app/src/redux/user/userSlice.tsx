import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IUserInformation } from "../../services/web-api-client";
import { handleGetUserData } from "./userThunk";

const initialState: IUserInformation = {
  avatar: "",
  disable: true,
  email: "",
  phoneNumber: "",
  userName: "",
  fullName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleGetUserData.fulfilled, (state: any, { payload }) => {
      if (payload) {
        return (state = { ...payload });
      } else {
        return (state = { ...initialState });
      }
    });
  },
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
