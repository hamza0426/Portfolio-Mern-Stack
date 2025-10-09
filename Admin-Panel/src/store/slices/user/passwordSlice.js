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
    passwordRequestStart(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    passwordRequestSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    passwordRequestFailed(state, action) {
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
  passwordRequestStart,
  passwordRequestSuccess,
  passwordRequestFailed,
  clearAllErrors,
} = passwordSlice.actions;

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(passwordRequestStart());
  try {
    const response = await axios.post(
      `${server}/api/v1/user/forgot-password`,
      { email },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    // console.log(response.data);
    dispatch(passwordRequestSuccess(response.data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(passwordRequestFailed(error.response?.data?.message));
  }
};

export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    dispatch(passwordRequestStart());
    try {
      const { data } = await axios.put(
        `${server}/api/v1/user/reset-password/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(passwordRequestSuccess(data.message));
      dispatch(clearAllErrors());
    } catch (error) {
      dispatch(passwordRequestFailed(error.response?.data?.message));
    }
  };

export default passwordSlice.reducer;
