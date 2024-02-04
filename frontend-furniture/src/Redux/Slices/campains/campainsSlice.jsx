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
  campains: [],
  campain: null,
  isDelete: false,
  isUpdate: false,
  success: false,
};

//kampanya oluşturma
export const addCampainAction = createAsyncThunk(
  "campains/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("desc", payload?.desc);
      formData.append("img", payload?.img);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/campain`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Tüm campain getirme
export const campainViewAction = createAsyncThunk(
  "campain/fetch-public-campain",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/campain`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Tek campain getirme
export const getCampainAction = createAsyncThunk(
  "campain/get-campain",
  async (campainId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/campain/${campainId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//campain silme
export const deleteCampainAction = createAsyncThunk(
  "campain/delete-campain",
  async (campainId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${BASE_URL}/campain/${campainId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//campain güncelleme
export const updateCampainAction = createAsyncThunk(
  "campain/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("desc", payload?.desc);
      formData.append("img", payload?.img);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/campain/${payload?.campainId}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const campainsSlice = createSlice({
  name: "campains",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //fetch public campains
    builder.addCase(campainViewAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(campainViewAction.fulfilled, (state, action) => {
      state.campains = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(campainViewAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! create campains
    builder.addCase(addCampainAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addCampainAction.fulfilled, (state, action) => {
      state.campains = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addCampainAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! update campains
    builder.addCase(updateCampainAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCampainAction.fulfilled, (state, action) => {
      state.campains = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateCampainAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! get single campains
    builder.addCase(getCampainAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCampainAction.fulfilled, (state, action) => {
      state.campains = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getCampainAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! detelet campains
    builder.addCase(deleteCampainAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(deleteCampainAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(deleteCampainAction.rejected, (state, action) => {
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
const campainsReducer = campainsSlice.reducer;

export default campainsReducer;
