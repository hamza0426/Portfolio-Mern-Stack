import { createSlice } from "@reduxjs/toolkit";

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
      state.skills = null;
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
  },
});

export default skillSlice.reducer;
