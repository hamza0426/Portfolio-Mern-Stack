import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../../main";

const initialState = {
  loading: false,
  allMessages: [],
  error: null,
  message: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    messageRequestStart(state) {
      state.loading = true;
      state.allMessages = [];
      state.error = null;
      state.message = null;
    },
    // messageRequestSuccess(state, action) {
    //   state.loading = false;
    //   state.allMessages = action.payload;
    //   state.error = null;
    //   state.message = action.payload;
    // },
    getAllMessagesSuccess(state, action) {
      state.loading = false;
      state.allMessages = action.payload;
      state.error = null;
    },
    deleteMessageSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    messageRequestFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    // getAllMessagesRequest(state) {
    //   state.allMessages = [];
    //   state.error = null;
    //   state.loading = true;
    // },
    // getAllMessagesSuccess(state, action) {
    //   state.allMessages = action.payload;
    //   state.error = null;
    //   state.loading = false;
    // },
    // getAllMessagesFailed(state, action) {
    //   state.error = action.payload;
    //   state.loading = false;
    // },
    // deleteMessageRequest(state) {
    //   state.message = null;
    //   state.error = null;
    //   state.loading = true;
    // },
    // deleteMessageSuccess(state, action) {
    //   state.message = action.payload;
    //   state.error = null;
    //   state.loading = false;
    // },
    // deleteMessageFailed(state, action) {
    //   state.message = null;
    //   state.error = action.payload;
    //   state.loading = false;
    // },
    resetMessage(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const {
  messageRequestStart,
  // messageRequestSuccess,
  getAllMessagesSuccess,
  deleteMessageSuccess,
  messageRequestFailed,
  // getAllMessagesRequest,
  // getAllMessagesSuccess,
  // getAllMessagesFailed,
  // deleteMessageRequest,
  // deleteMessageSuccess,
  // deleteMessageFailed,
  resetMessage,
  clearAllErrors,
} = messageSlice.actions;

export const getAllMessages = () => async (dispatch) => {
  dispatch(messageRequestStart());
  try {
    const { data } = await axios.get(
      `${server}/api/v1/message/get-all-messages`,
      {
        withCredentials: true,
      }
    );
    dispatch(getAllMessagesSuccess(data.messages));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(messageRequestFailed(error.response?.data?.message));
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageRequestStart());
  try {
    const { data } = await axios.delete(
      `${server}/api/v1/message/delete-message/${id}`,
      { withCredentials: true }
    );
    dispatch(deleteMessageSuccess(data.message));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(messageRequestFailed(error.response?.data?.message));
  }
};

export const clearAllMessageErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

export const resetMessageSlice = () => (dispatch) => {
  dispatch(resetMessage());
};

export default messageSlice.reducer;
