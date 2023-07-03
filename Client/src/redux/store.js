import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import vendorReducer from "./venderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    vendor: vendorReducer,
  },
});

export default store;
