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
  success: false,
  isDelete: false,
  isUpdated: false,
  isRegistered: false,
  isLogin: false,
  emailMessage: undefined,
  profile: [],
  isLiked: [],
  isViewed: [],
  isEmailSent: false,
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//! Login Action
export const loginAction = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(`${BASE_URL}/users/login`, payload);
      //! save the user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//! Register Action
export const registerAction = createAsyncThunk(
  "users/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(`${BASE_URL}/users/register`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//! Get User  Profile Action
export const userPrivateProfileAction = createAsyncThunk(
  "users/user-private-profile",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${BASE_URL}/users/profile/${userId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//!Follow Product Action
export const followProductAction = createAsyncThunk(
  "users/follow-product",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/users/likes/${productId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//!Unfollow Product Action
export const unFollowProductAction = createAsyncThunk(
  "users/unFollow-product",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/users/dislikes/${productId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
// ! Logout action
export const logoutAction = createAsyncThunk("users/logout", async () => {
  //remove token from localstorage
  localStorage.removeItem("userInfo");
  return true;
});
//!forgot password Action
export const forgotPasswordAction = createAsyncThunk(
  "users/forgot-password",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        `${BASE_URL}/users/forgot-password`,
        payload
      );
      //! save the user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//! reset password Action
export const passwordResetAction = createAsyncThunk(
  "users/password-reset",
  async ({ resetToken, password }, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        `${BASE_URL}/users/reset-password/${resetToken}`,
        {
          password,
        }
      );
      //! save the user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//! update user profile Action
export const updateUserProfileAction = createAsyncThunk(
  "users/update-user-profile",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    console.log(payload);
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/users/update-profile/`,
        payload,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//!user product view
export const productViewsCounttAction = createAsyncThunk(
  "users/product-view",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/users/product-view/${productId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Users Slices
const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //Login
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.isLogin = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isLogin = false;
    });
    //Update user profile
    builder.addCase(updateUserProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfileAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isUpdated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateUserProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    });
    //get user private profile
    builder.addCase(userPrivateProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userPrivateProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(userPrivateProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //forgot password
    builder.addCase(forgotPasswordAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(forgotPasswordAction.fulfilled, (state, action) => {
      state.isEmailSent = true;
      state.emailMessage = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(forgotPasswordAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //reset password
    builder.addCase(passwordResetAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(passwordResetAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(passwordResetAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //follow product
    builder.addCase(followProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(followProductAction.fulfilled, (state, action) => {
      // isLiked alanını güncelle
      state.isLiked = action.payload.isLiked;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(followProductAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //unfollow user
    builder.addCase(unFollowProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(unFollowProductAction.fulfilled, (state, action) => {
      state.isLiked = action.payload.isLiked;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(unFollowProductAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //! Register
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isRegistered = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(registerAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isRegistered = false;
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
const usersReducer = usersSlice.reducer;

export default usersReducer;
