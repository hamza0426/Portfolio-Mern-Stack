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
    getAllSkillsRequest(state) {
      state.loading = true;
      state.skills = [];
      state.error = null;
    },
    getAllSkillsSuccess(state, action) {
      state.loading = false;
      state.skills = action.payload;
      state.error = null;
    },
    getAllSkillsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
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
  getAllSkillsRequest,
  getAllSkillsSuccess,
  getAllSkillsFailed,
  addSkillRequest,
  addSkillSuccess,
  addSkillFailed,
  resetSkills,
  clearAllErrors,
} = skillSlice.actions;

export const getAllSkills = () => async (dispatch) => {
  dispatch(getAllSkillsRequest());
  try {
    const { data } = await axios.get(`${server}/api/v1/skill/get-all-skills`, {
      withCredentials: true,
    });
    dispatch(getAllSkillsSuccess(data.skills));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(getAllSkillsFailed(error.response?.data?.message));
  }
};

export const addNewSkill = (data) => async (dispatch) => {
  dispatch(addSkillRequest());
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
    dispatch(addSkillFailed(error.response?.data?.message));
  }
};

// export const deleteTimeline = (id) => async (dispatch) => {
//   dispatch(requestStart());
//   try {
//     const { data } = await axios.delete(
//       `${server}/api/v1/timeline/delete-timeline/${id}`,
//       { withCredentials: true }
//     );
//     dispatch(requestSuccess(data.message));
//     dispatch(clearAllErrors());
//   } catch (error) {
//     dispatch(requestFailed(error.response?.data?.message));
//   }
// };

export const clearAllSkillErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

export const resetSkillSlice = () => (dispatch) => {
  dispatch(resetSkills());
};

export default skillSlice.reducer;
