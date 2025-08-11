import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../../main";

const initialState = {
  loading: false,
  user: {},
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    requestStart(state) {
      state.loading = true;
      state.isLoggedIn = false;
      state.error = null;
    },
    requestSuccess(state, action) {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
      state.message = action.payload;
    },
    requestFailed(state, action) {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = {};
      state.message = action.payload;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const {
  requestStart,
  requestSuccess,
  requestFailed,
  logoutSuccess,
  clearAllErrors,
} = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.post(
      `${server}/api/v1/user/login`,
      { email, password },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(requestSuccess(data.user));
    toast.success(data.message); // ✅ you’ll see toast if backend sends `message`
  } catch (error) {
    const errMsg = error.response?.data?.message || "Login failed. Try again.";
    dispatch(requestFailed(errMsg));
    toast.error(errMsg); // ✅ show error toast
  }
};

export const logout = () => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.get(`${server}/api/v1/user/logout`, {
      withCredentials: true,
    });
    dispatch(logoutSuccess());
    toast.success(data.message || "Logged out successfully");
  } catch (error) {
    const errMsg = error.response?.data?.message || "Logout failed";
    dispatch(requestFailed(errMsg));
    toast.error(errMsg);
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.get(`${server}/api/v1/user/get-user`, {
      withCredentials: true,
    });
    dispatch(requestSuccess(data.user));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(requestFailed(error.response?.data?.message));
  }
};

export const clearUserErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

export default authSlice.reducer;
