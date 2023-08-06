import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ICategoryList, IUserListDto } from "../../services/web-api-client";
import { handleGetAllCategoryData } from "./categoriesThunk";

const initialState: ICategoryList = {
  categoryDtos: [],
};

export const categoriesSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCategories: (_state: any, action: PayloadAction<any>) => {
      return (_state = action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      handleGetAllCategoryData.fulfilled,
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
export const { setCategories } = categoriesSlice.actions;
export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
