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
  products: [],
  product: null,
  success: false,
};

//Tüm ürünleri getirme
export const productsViewAction = createAsyncThunk(
  "product/fetch-public-products",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/products`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Tek ürün getirme
export const getProductAction = createAsyncThunk(
  "product/get-product",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/products/${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Ürün oluşturma
export const addProductAction = createAsyncThunk(
  "product/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("name", payload?.name);
      formData.append("colors", payload?.colors);
      formData.append("description", payload?.description);
      formData.append("stokCode", payload?.stokCode);
      formData.append("price", payload?.price);
      formData.append("warranty", payload?.warranty);
      formData.append("stokCount", payload?.stokCount);
      formData.append("productType", payload?.productType);
      formData.append("img", payload?.img);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/products`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Ürün silme
export const deleteProductAction = createAsyncThunk(
  "product/delete-product",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${BASE_URL}/products/${productId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Ürün güncelleme
export const updateProductAction = createAsyncThunk(
  "product/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("name", payload?.name);
      formData.append("colors", payload?.colors);
      formData.append("description", payload?.description);
      formData.append("stokCode", payload?.stokCode);
      formData.append("price", payload?.price);
      formData.append("warranty", payload?.warranty);
      formData.append("stokCount", payload?.stokCount);
      formData.append("productType", payload?.productType);
      formData.append("img", payload?.img);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/products/${payload?.productId}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //fetch public posts
    builder.addCase(productsViewAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(productsViewAction.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(productsViewAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! create post
    builder.addCase(addProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addProductAction.fulfilled, (state, action) => {
      state.products = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addProductAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! update post
    builder.addCase(updateProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      state.products = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateProductAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! get single post
    builder.addCase(getProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductAction.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getProductAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! detelet post
    builder.addCase(deleteProductAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(deleteProductAction.rejected, (state, action) => {
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
const productsReducer = productSlice.reducer;

export default productsReducer;
