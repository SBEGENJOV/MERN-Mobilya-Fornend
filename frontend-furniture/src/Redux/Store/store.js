import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Slices/users/usersSlices";
import productsReducer from "../Slices/product/productsSlice";
import couponReducer from "../Slices/coupon/couponSlice";
import productTypeReducer from "../Slices/product type/productTypeSlice";
import contactReducer from "../Slices/contact/contactSlice";
import commentReducer from "../Slices/comments/commentsSlice";
import categoryReducer from "../Slices/categories/categoriesSlice";
import campainsReducer from "../Slices/campains/campainsSlice";
import blogReducer from "../Slices/blog/blogSlice";

//! Store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    coupon: couponReducer,
    productTypes: productTypeReducer,
    contacts: contactReducer,
    comments: commentReducer,
    category: categoryReducer,
    campains: campainsReducer,
    blog: blogReducer,
  },
});

export default store;
