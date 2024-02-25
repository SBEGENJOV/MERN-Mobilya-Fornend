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
  comments: [],
  isDelete: false,
  isUpdate: false,
  comment: null,
  success: false,
};

//yorum oluşturma
export const createCommentAction = createAsyncThunk(
  "comment/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { productId, message, user } = payload.comments[1]; // payload'dan productId ve message değerlerini al

      const { data } = await axios.post(
        `${BASE_URL}/comment`,
        {
          message: message,
          author: user,
          productId: productId,
        },
        config
      );
      console.log(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Tüm yorumları getirme
export const commentViewAction = createAsyncThunk(
  "comment/fetch-public-comment",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/comment`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//yorum silme
export const deletecommentsAction = createAsyncThunk(
  "comment/delete-comment",
  async (commentId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${BASE_URL}/comment/${commentId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const commentSlice = createSlice({
  name: "coupon",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //fetch public kupon
    builder.addCase(commentViewAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(commentViewAction.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(commentViewAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! create yorum
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! detelet yorum
    builder.addCase(deletecommentsAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(deletecommentsAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(deletecommentsAction.rejected, (state, action) => {
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
const commentReducer = commentSlice.reducer;

export default commentReducer;
