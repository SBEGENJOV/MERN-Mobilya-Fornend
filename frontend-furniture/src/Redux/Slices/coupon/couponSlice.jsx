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
  coupons: [],
  coupon: null,
  success: false,
};

//Kupon oluşturma
export const addCouponAction = createAsyncThunk(
  "coupon/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("code", payload?.code);
      formData.append("discountPercent", payload?.discountPercent);
      formData.append("description", payload?.counts);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`${BASE_URL}/coupon`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Tüm kuponları getirme
export const couponViewAction = createAsyncThunk(
  "coupon/fetch-public-coupons",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/coupon`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Tek kuponları getirme
export const getCouponAction = createAsyncThunk(
  "coupon/get-product",
  async (couponId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/coupon/${couponId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Kupon kullanma
export const useCouponAction = createAsyncThunk(
  "coupon/get-product",
  async (couponId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/coupon/single/${couponId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Kupon silme
export const deleteCouponAction = createAsyncThunk(
  "coupon/delete-coupon",
  async (couponId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${BASE_URL}/coupon/${couponId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Kupon güncelleme
export const updateCouponAction = createAsyncThunk(
  "coupon/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("code", payload?.code);
      formData.append("discountPercent", payload?.discountPercent);
      formData.append("description", payload?.counts);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/coupon/${payload?.productId}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //fetch public kupon
    builder.addCase(couponViewAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(couponViewAction.fulfilled, (state, action) => {
      state.coupons = action.payload;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(couponViewAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! create kupon
    builder.addCase(addCouponAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addCouponAction.fulfilled, (state, action) => {
      state.coupons = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addCouponAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! update kupon
    builder.addCase(updateCouponAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCouponAction.fulfilled, (state, action) => {
      state.coupons = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateCouponAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! get single post
    builder.addCase(getCouponAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCouponAction.fulfilled, (state, action) => {
      state.coupons = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getCouponAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! detelet post
    builder.addCase(deleteCouponAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(deleteCouponAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(deleteCouponAction.rejected, (state, action) => {
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
