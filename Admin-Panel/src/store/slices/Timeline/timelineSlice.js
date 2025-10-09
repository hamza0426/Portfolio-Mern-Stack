import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../../main";

const initialState = {
  loading: false,
  timeline: [],
  error: null,
  message: null,
};

const timelineSlice = createSlice({
  name: "timelines",
  initialState,
  reducers: {
    // addTimelineRequest(state) {
    //   state.loading = true;
    //   state.error = null;
    //   state.message = null;
    // },
    timelineRequestStart(state) {
      state.loading = true;
      // state.timeline = [];
      state.error = null;
      state.message = null;
    },
    // addTimelineSuccess(state, action) {
    //   state.loading = false;
    //   state.error = null;
    //   state.message = action.payload;
    // },
    timelineRequestSuccess(state, action) {
      state.loading = false;
      state.timeline = action.payload;
      state.error = null;
      state.message = action.payload;
      //     if (Array.isArray(action.payload)) {
      //   state.timeline = action.payload; // For getAllTimelines
      // } else if (typeof action.payload === "string") {
      //   state.message = action.payload; // For add/delete messages
      // } else if (typeof action.payload === "object") {
      //   state.timeline = [...state.timeline, action.payload]; // For add single timeline
      // }
    },
    // addTimelineFailed(state, action) {
    //   state.loading = false;
    //   state.error = action.payload;
    //   state.message = null;
    // },
    timelineRequestFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    // getAllTimelinesRequest(state) {
    //   state.timeline = [];
    //   state.error = null;
    //   state.loading = true;
    // },
    // getAllTimelinesSuccess(state, action) {
    //   state.timeline = action.payload;
    //   state.error = null;
    //   state.loading = false;
    // },
    // getAllTimelinesFailed(state, action) {
    //   state.error = action.payload;
    //   state.loading = false;
    // },
    // deleteTimelineRequest(state) {
    //   state.message = null;
    //   state.error = null;
    //   state.loading = true;
    // },
    // deleteTimelineSuccess(state, action) {
    //   state.message = action.payload;
    //   state.error = null;
    //   state.loading = false;
    // },
    // deleteTimelineFailed(state, action) {
    //   state.message = null;
    //   state.error = action.payload;
    //   state.loading = false;
    // },
    resetTimeline(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const {
  timelineRequestStart,
  timelineRequestSuccess,
  timelineRequestFailed,
  // addTimelineRequest,
  // addTimelineSuccess,
  // addTimelineFailed,
  // getAllTimelinesRequest,
  // getAllTimelinesSuccess,
  // getAllTimelinesFailed,
  // deleteTimelineRequest,
  // deleteTimelineSuccess,
  // deleteTimelineFailed,
  resetTimeline,
  clearAllErrors,
} = timelineSlice.actions;

export const addNewTimeline = (timelineData) => async (dispatch) => {
  dispatch(timelineRequestStart());
  try {
    const { data } = await axios.post(
      `${server}/api/v1/timeline/add-timeline`,
      timelineData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(timelineRequestSuccess(data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(timelineRequestFailed(error.response?.data?.message));
  }
};

export const getAllTimelines = () => async (dispatch) => {
  dispatch(timelineRequestStart());
  try {
    const { data } = await axios.get(
      `${server}/api/v1/timeline/get-all-timelines`,
      {
        withCredentials: true,
      }
    );
    dispatch(timelineRequestSuccess(data.messages));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(timelineRequestFailed(error.response?.data?.message));
  }
};

export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineRequestStart());
  try {
    const { data } = await axios.delete(
      `${server}/api/v1/timeline/delete-timeline/${id}`,
      { withCredentials: true }
    );
    dispatch(timelineRequestSuccess(data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(timelineRequestFailed(error.response?.data?.message));
  }
};

export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

export const resetTimelineSlice = () => (dispatch) => {
  dispatch(resetTimeline());
};

export default timelineSlice.reducer;
