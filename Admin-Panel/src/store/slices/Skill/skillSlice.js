import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../../main";

const initialState = {
  loading: false,
  skills: [],
  error: null,
  message: null,
};

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    skillRequestStart(state) {
      state.loading = true;
      state.skills = [];
      state.error = null;
      state.message = null;
    },
    // skillRequestSuccess(state, action) {
    //   state.loading = false;
    //   state.skills = action.payload;
    //   state.error = null;
    //   state.message = action.payload;
    // },
    getAllSkillsSuccess(state, action) {
      state.loading = false;
      state.skills = action.payload;
      state.error = null;
    },
    addSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    skillRequestFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    // getAllSkillsRequest(state) {
    //   state.loading = true;
    //   state.skills = [];
    //   state.error = null;
    // },
    // getAllSkillsFailed(state, action) {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    // addSkillRequest(state) {
    //   state.loading = true;
    //   state.error = null;
    //   state.message = null;
    // },
    // addSkillFailed(state, action) {
    //   state.loading = false;
    //   state.error = action.payload;
    //   state.message = null;
    // },
    // deleteSkillRequest(state) {
    //   state.loading = true;
    //   state.error = null;
    //   state.message = null;
    // },
    // deleteSkillFailed(state, action) {
    //   state.loading = false;
    //   state.error = action.payload;
    //   state.message = null;
    // },
    resetSkills(state) {
      state.loading = false;
      //   state.skills = [];
      state.error = null;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const {
  skillRequestStart,
  //   skillRequestSuccess,
  getAllSkillsSuccess,
  addSkillSuccess,
  deleteSkillSuccess,
  skillRequestFailed,
  //   getAllSkillsRequest,
  //   getAllSkillsSuccess,
  //   getAllSkillsFailed,
  //   addSkillRequest,
  //   addSkillSuccess,
  //   addSkillFailed,
  //   deleteSkillRequest,
  //   deleteSkillSuccess,
  //   deleteSkillFailed,
  resetSkills,
  clearAllErrors,
} = skillSlice.actions;

export const getAllSkills = () => async (dispatch) => {
  dispatch(skillRequestStart());
  try {
    const { data } = await axios.get(`${server}/api/v1/skill/get-all-skills`, {
      withCredentials: true,
    });
    dispatch(getAllSkillsSuccess(data.skills));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(skillRequestFailed(error.response?.data?.message));
  }
};

export const addNewSkill = (data) => async (dispatch) => {
  dispatch(skillRequestStart());
  try {
    const response = await axios.post(
      `${server}/api/v1/skill/add-skill`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(addSkillSuccess(response.data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(skillRequestFailed(error.response?.data?.message));
  }
};

export const deleteSkill = (id) => async (dispatch) => {
  dispatch(skillRequestStart());
  try {
    const { data } = await axios.delete(
      `${server}/api/v1/skill/delete-skill/${id}`,
      { withCredentials: true }
    );
    dispatch(deleteSkillSuccess(data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(skillRequestFailed(error.response?.data?.message));
  }
};

// export const updateSkill = (proficiency) => async (dispatch) => {}

export const clearAllSkillErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

export const resetSkillSlice = () => (dispatch) => {
  dispatch(resetSkills());
};

export default skillSlice.reducer;
