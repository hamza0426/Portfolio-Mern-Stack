import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../../main";

const initialState = {
  loading: false,
  applications: [],
  error: null,
  message: null,
};

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    applicationRequestStart(state) {
      state.loading = true;
      //   state.applications = [];
      state.error = null;
      state.message = null;
    },
    getAllApplicationSuccess(state, action) {
      state.loading = false;
      state.applications = action.payload;
      state.error = null;
    },
    addApplicationSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteApplicationSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    applicationRequestFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetApplications(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

const {
  applicationRequestStart,
  getAllApplicationSuccess,
  addApplicationSuccess,
  deleteApplicationSuccess,
  applicationRequestFailed,
  resetApplications,
  clearAllErrors,
} = applicationSlice.actions;

export const getAllApplications = () => async (dispatch) => {
  dispatch(applicationRequestStart());
  try {
    const { data } = await axios.get(
      `${server}/api/v1/application/get-all-applications`,
      { withCredentials: true }
    );
    dispatch(getAllApplicationSuccess(data.applications));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(applicationRequestFailed(error.response?.data?.message));
  }
};

export const addApplication = (applicationData) => async (dispatch) => {
  dispatch(applicationRequestStart());
  try {
    const { data } = await axios.post(
      `${server}/api/v1/application/add-application`,
      applicationData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(addApplicationSuccess(data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(applicationRequestFailed(error.response?.data?.message));
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  dispatch(applicationRequestStart());
  try {
    const { data } = await axios.delete(
      `${server}/api/v1/application/delete-application/${id}`,
      { withCredentials: true }
    );
    dispatch(deleteApplicationSuccess(data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(applicationRequestFailed(error.response?.data?.message));
  }
};

export const resetApplicationSlice = () => (dispatch) => {
  dispatch(resetApplications());
};

export const clearAllApplicationErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

export default applicationSlice.reducer;
