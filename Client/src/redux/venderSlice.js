import { createSlice } from "@reduxjs/toolkit";

const venderSlice = createSlice({
  name: "vendor",
  initialState: null,
  reducers: {
    setVendor: (state, action) => action.payload,
    clearVendor: (state) => null,
  },
});

export const { setVendor, clearVendor } = venderSlice.actions;
export default venderSlice.reducer;
