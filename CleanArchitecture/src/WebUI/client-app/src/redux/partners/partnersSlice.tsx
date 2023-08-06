import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IPartnerList } from "../../services/web-api-client";
import { handleGetAllPartnerData } from "./partnersThunk";

const initialState: IPartnerList = {
  partnerDtos: [],
};

export const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {
    setPartners: (_state: any, action: PayloadAction<any>) => {
      return (_state = action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      handleGetAllPartnerData.fulfilled,
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
export const { setPartners } = partnersSlice.actions;
export const selectPartners = (state: RootState) => state.partners;

export default partnersSlice.reducer;
