import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccesAction,
} from "../globalSlice/globalSlice";
import BASE_URL from "../../../utils/baseURL";
import { updateCouponAction } from "../coupon/couponSlice";

const INITIAL_STATE = {
  loading: false,
  error: null,
  contacts: [],
  contact: null,
  isDelete: false,
  isUpdate: false,
  success: false,
};

//İletişim oluşturma
export const addContactAction = createAsyncThunk(
  "contact/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("name", payload?.name);
      formData.append("mail", payload?.mail);
      formData.append("subject", payload?.subject);
      formData.append("content", payload?.content);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/contact`,
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
export const contactViewAction = createAsyncThunk(
  "contact/fetch-public-contacts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/contact`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//İletişim silme
export const deleteContactAction = createAsyncThunk(
  "contact/delete-contact",
  async (contactId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${BASE_URL}/contact/${contactId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //fetch public iletişim
    builder.addCase(contactViewAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(contactViewAction.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(contactViewAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! create iletişim
    builder.addCase(addContactAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addContactAction.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addContactAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! delete kupon
    builder.addCase(deleteContactAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(deleteContactAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(deleteContactAction.rejected, (state, action) => {
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
const contactReducer = contactSlice.reducer;

export default contactReducer;
