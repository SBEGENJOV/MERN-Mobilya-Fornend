import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccesAction,
} from "../globalSlice/globalSlice";
import BASE_URL from "../../../utils/baseURL";

const INITIAL_STATE = {
  loading: false,
  error: null,
  blogs: [],
  blog: null,
  isDelete: false,
  isUpdate: false,
  success: false,
};

//blog oluşturma
export const addBlogAction = createAsyncThunk(
  "blog/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("desc", payload?.desc);
      formData.append("writer", payload?.writer);
      formData.append("img", payload?.img);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`${BASE_URL}/blog`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Tüm blog getirme
export const blogViewAction = createAsyncThunk(
  "blog/fetch-public-blog",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/blog`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Tek blog getirme
export const getBlogAction = createAsyncThunk(
  "blog/get-blog",
  async (blogId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/blog/${blogId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//blog silme
export const deleteBlogAction = createAsyncThunk(
  "blog/delete-blog",
  async (blogId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(`${BASE_URL}/blog/${blogId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//blog güncelleme
export const updateBlogAction = createAsyncThunk(
  "blog/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("desc", payload?.desc);
      formData.append("writer", payload?.writer);
      formData.append("img", payload?.img);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/blog/${payload?.blogId}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //fetch public campains
    builder.addCase(blogViewAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(blogViewAction.fulfilled, (state, action) => {
      state.blogs = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(blogViewAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! create blogs
    builder.addCase(addBlogAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addBlogAction.fulfilled, (state, action) => {
      state.blogs = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addBlogAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! update blogs
    builder.addCase(updateBlogAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateBlogAction.fulfilled, (state, action) => {
      state.blogs = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateBlogAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! get single blogs
    builder.addCase(getBlogAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBlogAction.fulfilled, (state, action) => {
      state.blogs = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getBlogAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! detelet campains
    builder.addCase(deleteBlogAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(deleteBlogAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(deleteBlogAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! Reset error action
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = null;
    });
    //! Reset success action
    builder.addCase(resetSuccesAction.fulfilled, (state) => {
      state.success = false;
    });
  },
});

//! generate reducer
const blogReducer = blogSlice.reducer;

export default blogReducer;
