import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: (state) => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
