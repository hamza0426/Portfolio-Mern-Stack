import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../../main";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const infoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },
    requestSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    requestFailed(state, action) {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const { requestStart, requestSuccess, requestFailed, clearAllErrors } =
  infoSlice.actions;

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

export default infoSlice.reducer;
