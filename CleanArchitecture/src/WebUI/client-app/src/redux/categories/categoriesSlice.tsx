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
    setCategories: (state: any, action: PayloadAction<any>) => {
      return (state = action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      handleGetAllCategoryData.fulfilled,
      (state: any, action: any) => {
        if (action.payload) {
          return (state = action.payload);
        } else {
          return (state = initialState);
        }
      }
    );
  },
});
export const { setCategories } = categoriesSlice.actions;
export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
