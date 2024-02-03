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
  productTypes: [],
  productType: null,
  isDelete: false,
  isUpdate: false,
  success: false,
};

//Tür oluşturma
export const addProductTypeAction = createAsyncThunk(
  "productType/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("name", payload?.name);
      formData.append("category", payload?.category);
      formData.append("img", payload?.img);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/productType`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Tüm türleri getirme
export const productTypeViewAction = createAsyncThunk(
  "coupon/fetch-public-coupons",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/productType`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Tek türü getirme
export const getProductTypeAction = createAsyncThunk(
  "productType/get-productType",
  async (productTypeId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(
        `${BASE_URL}/productType/${productTypeId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Tür silme
export const deleteProductTypeAction = createAsyncThunk(
  "productType/delete-productType",
  async (productTypeId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${BASE_URL}/productType/${productTypeId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Tür güncelleme
export const updateProductTypeAction = createAsyncThunk(
  "productType/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("name", payload?.name);
      formData.append("category", payload?.category);
      formData.append("img", payload?.img);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/productType/${payload?.productTypeId}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const productTypeSlice = createSlice({
  name: "productType",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //fetch public kupon
    builder.addCase(productTypeViewAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(productTypeViewAction.fulfilled, (state, action) => {
      state.productTypes = action.payload;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(productTypeViewAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! create tür
    builder.addCase(addProductTypeAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addProductTypeAction.fulfilled, (state, action) => {
      state.productTypes = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addProductTypeAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! update tür
    builder.addCase(updateProductTypeAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProductTypeAction.fulfilled, (state, action) => {
      state.productTypes = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateProductTypeAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! get single tür
    builder.addCase(getProductTypeAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductTypeAction.fulfilled, (state, action) => {
      state.productTypes = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getProductTypeAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! detelet post
    builder.addCase(deleteProductTypeAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(deleteProductTypeAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(deleteProductTypeAction.rejected, (state, action) => {
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
const productTypeReducer = productTypeSlice.reducer;

export default productTypeReducer;
