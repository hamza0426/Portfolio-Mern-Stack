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
    getAllMessagesRequest(state) {
      state.allMessages = [];
      state.error = null;
      state.loading = true;
    },
    getAllMessagesSuccess(state, action) {
      state.allMessages = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllMessagesFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteMessageRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteMessageSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteMessageFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
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
  getAllMessagesRequest,
  getAllMessagesSuccess,
  getAllMessagesFailed,
  clearAllErrors,
} = messageSlice.actions;

export const getAllMessages = () => async (dispatch) => {
  dispatch(getAllMessagesRequest());
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
    dispatch(getAllMessagesFailed(error.response?.data?.message));
  }
};

export default messageSlice.reducer;
