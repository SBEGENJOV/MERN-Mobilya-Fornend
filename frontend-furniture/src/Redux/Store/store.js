import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Slices/users/usersSlices";
import productsReducer from "../Slices/product/productsSlice";

//! Store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
  },
});

export default store;
