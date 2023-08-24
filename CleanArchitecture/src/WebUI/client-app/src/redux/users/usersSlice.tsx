import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IUserListDto } from "../../services/web-api-client";
import { handleGetAllUserData } from "./usersThunk";

const initialState: IUserListDto = {
  listUserDto: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (_state: any, action: PayloadAction<any>) => {
      return (_state = action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      handleGetAllUserData.fulfilled,
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
export const { setUsers } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
