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
  categories: [],
  category: null,
  isDelete: false,
  isUpdate: false,
  success: false,
};

//category oluşturma
export const addCategoryAction = createAsyncThunk(
  "category/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("name", payload?.name);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/category`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Tüm category getirme
export const categoryViewAction = createAsyncThunk(
  "category/fetch-public-category",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/category`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Tek category getirme
export const getCategoryAction = createAsyncThunk(
  "category/get-category",
  async (categoryId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/category/${categoryId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//category silme
export const deleteCategoryAction = createAsyncThunk(
  "category/delete-category",
  async (categoryId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${BASE_URL}/category/${categoryId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//category güncelleme
export const updateCategoryAction = createAsyncThunk(
  "category/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("name", payload?.name);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/category/${payload?.categoryId}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //fetch public categori
    builder.addCase(categoryViewAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(categoryViewAction.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(categoryViewAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! create categori
    builder.addCase(addCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addCategoryAction.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addCategoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! update categori
    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! get single categori
    builder.addCase(getCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCategoryAction.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getCategoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! detelet kupon
    builder.addCase(deleteCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
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
const couponReducer = couponSlice.reducer;

export default couponReducer;
