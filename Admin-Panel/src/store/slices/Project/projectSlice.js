import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../../main";

const initialState = {
  loading: false,
  projects: [],
  error: null,
  message: null,
  singleProject: {},
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    projectRequestStart(state) {
      state.loading = true;
      state.projects = [];
      state.error = null;
      state.message = null;
    },
    getAllProjectsSuccess(state, action) {
      state.loading = false;
      state.projects = action.payload;
      state.error = null;
    },
    addProjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteProjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    projectRequestFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetProjects(state) {
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
  projectRequestStart,
  getAllProjectsSuccess,
  addProjectSuccess,
  deleteProjectSuccess,
  projectRequestFailed,
  resetProjects,
  clearAllErrors,
} = projectSlice.actions;

export const getAllProjects = () => async (dispatch) => {
  dispatch(projectRequestStart());
  try {
    const { data } = await axios.get(
      `${server}/api/v1/project/get-all-projects`,
      { withCredentials: true }
    );
    dispatch(getAllProjectsSuccess(data.projects));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(projectRequestFailed(error.response?.data?.message));
  }
};

export const addProject = (projectData) => async (dispatch) => {
  dispatch(projectRequestStart());
  try {
    const response = await axios.post(
      `${server}/api/v1/project/add-project`,
      projectData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(addProjectSuccess(response.data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(projectRequestFailed(error.response?.data?.message));
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectRequestStart());
  try {
    const { data } = await axios.delete(
      `${server}/api/v1/project/delete-project/${id}`,
      { withCredentials: true }
    );
    dispatch(deleteProjectSuccess(data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(projectRequestFailed(error.response?.data?.message));
  }
};

export const resetProjectSlice = () => (dispatch) => {
  dispatch(resetProjects());
};

export const clearProjectErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

export default projectSlice.reducer;
