import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Slices/users/usersSlices";
import productsReducer from "../Slices/product/productsSlice";
import couponReducer from "../Slices/coupon/couponSlice";

//! Store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    coupon: couponReducer,
  },
});

export default store;
