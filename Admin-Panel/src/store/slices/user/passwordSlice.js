import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { server } from "../../../main";

const initialState = {
  loading: false,
  error: null,
  message: null,
};

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    passwordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    passwordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    passwordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
      // state.message = null;
    },
  },
});

export const {
  passwordRequest,
  passwordSuccess,
  passwordFailed,
  clearAllErrors,
} = passwordSlice.actions;

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(passwordRequest());
  try {
    const response = await axios.post(
      `${server}/api/v1/user/forgot-password`,
      { email },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    // console.log(response.data);
    dispatch(passwordSuccess(response.data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(passwordFailed(error.response?.data?.message));
  }
};

export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    dispatch(passwordRequest());
    try {
      const { data } = await axios.put(
        `${server}/api/v1/user/reset-password/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(passwordSuccess(data.message));
      dispatch(clearAllErrors());
    } catch (error) {
      dispatch(passwordFailed(error.response?.data?.message));
    }
  };

export default passwordSlice.reducer;
