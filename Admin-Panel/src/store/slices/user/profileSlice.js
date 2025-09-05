import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../../main";

const initialState = {
  loading: false,
  isUpdated: false,
  message: null,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateRequest(state) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updateSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updateFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },
    resetUpdateStatus(state) {
      state.error = null;
      state.isUpdated = false;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
      // state.user = state.user;
    },
  },
});

export const {
  updateRequest,
  updateSuccess,
  updateFailed,
  resetUpdateStatus,
  clearAllErrors,
} = profileSlice.actions;

export const updateProfile = (updatedData) => async (dispatch) => {
  dispatch(updateRequest());
  try {
    const { data } = await axios.put(
      `${server}/api/v1/user/update-profile`,
      updatedData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(updateSuccess(data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(updateFailed(error.response?.data?.message));
  }
};

export const updatePassword =
  (currentPassword, newPassword, confirmPassword) => async (dispatch) => {
    dispatch(updateRequest());
    try {
      const { data } = await axios.put(
        `${server}/api/v1/user/update-password`,
        { currentPassword, newPassword, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(updateSuccess(data.message));
      dispatch(clearAllErrors());
    } catch (error) {
      dispatch(updateFailed(error.response?.data?.message));
    }
  };

export const resetProfile = () => (dispatch) => {
  dispatch(resetUpdateStatus());
};

export const clearProfileErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

export default profileSlice.reducer;
