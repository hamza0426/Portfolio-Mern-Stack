// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";

// const initialState = {
//   loading: false,
//   user: {},
//   isLoggedIn: false,
//   error: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   // initialState: {
//   //     loading: false,
//   //     user: {},
//   //     isLoggedIn: false,
//   //     error: null,
//   //     message: null,
//   // },
//   reducers: {
//     // ✅ Unified request handler
//     requestStart(state) {
//       state.loading = true;
//       state.isLoggedIn = false;
//       state.user = {};
//       state.error = null;
//     },
//     // ✅ Unified success handler
//     requestSuccess(state, action) {
//       state.loading = false;
//       state.isLoggedIn = true;
//       state.user = action.payload;
//       state.error = null;
//       state.message = action.payload;
//     },
//     // ✅ Unified failure handler
//     requestFailed(state, action) {
//       state.loading = false;
//       state.isLoggedIn = false;
//       state.user = {};
//       state.error = action.payload;
//     },
//     updatePasswordRequest(state) {
//       state.loading = false;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = null;
//     },
//     updatePasswordSuccess(state, action) {
//       state.loading = false;
//       state.isUpdated = true;
//       state.message = action.payload;
//       state.error = null;
//     },
//     updatePasswordFailed(state, action) {
//       state.loading = false;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = action.payload;
//     },
//     updateProfileRequest(state) {
//       state.loading = false;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = null;
//     },
//     updateProfileSuccess(state, action) {
//       state.loading = false;
//       state.isUpdated = true;
//       state.message = action.payload;
//       state.error = null;
//     },
//     updateProfileFailed(state, action) {
//       state.loading = false;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = action.payload;
//     },
//     profileResetAfterUpdate(state) {
//       state.error = null;
//       state.isUpdated = false;
//       state.message = null;
//     },
//     clearAllErrors(state) {
//       state.error = null;
//       // state.user = state.user;
//     },
//   },
// });

// // export const login = (email, password) => async(dispatch) => {
// //     dispatch(userSlice.actions.requestStart());
// //     try {
// //         const { data } = await axios.post("http://localhost:4000/api/v1/user/login",
// //             {email, password}, {withCredentials: true, headers: { "Content-Type": "application/json"}});
// //         dispatch(userSlice.actions.requestSuccess(data.user));
// //         toast.success(data.message);
// //         dispatch(userSlice.actions.clearAllErrors());
// //     } catch (error) {
// //         dispatch(userSlice.actions.requestFailed(error.response?.data?.message || "Login failed, Please try again!!!"));
// //     }
// // };

// // export const getUser = () => async (dispatch) => {
// //   dispatch(userSlice.actions.requestStart());
// //   try {
// //     const { data } = await axios.get(
// //       "http://localhost:4000/api/v1/user/get-user",
// //       { withCredentials: true }
// //     );
// //     dispatch(userSlice.actions.requestSuccess(data.user));
// //     dispatch(userSlice.actions.clearAllErrors());
// //   } catch (error) {
// //     dispatch(userSlice.actions.requestFailed(error.response?.data?.message));
// //   }
// // };

// // export const updatePassword =
// //   (currentPassword, newPassword, confirmPassword) => async (dispatch) => {
// //     dispatch(userSlice.actions.updatePasswordRequest());
// //     try {
// //       const { data } = await axios.put(
// //         "http://localhost:4000/api/v1/user/update-password",
// //         { currentPassword, newPassword, confirmPassword },
// //         {
// //           withCredentials: true,
// //           headers: { "Content-Type": "application/json" },
// //         }
// //       );
// //       dispatch(userSlice.actions.updatePasswordSuccess(data.message));
// //       dispatch(userSlice.actions.clearAllErrors());
// //     } catch (error) {
// //       dispatch(
// //         userSlice.actions.updatePasswordFailed(error.response?.data?.message)
// //       );
// //     }
// //   };

// // export const updateProfile = (datas) => async (dispatch) => {
// //   dispatch(userSlice.actions.updateProfileRequest());
// //   try {
// //     const { data } = await axios.put(
// //       "http://localhost:4000/api/v1/user/update-profile",
// //       datas,
// //       {
// //         withCredentials: true,
// //         headers: { "Content-Type": "multipart/form-data" },
// //       }
// //     );
// //     dispatch(userSlice.actions.updateProfileSuccess(data.message));
// //     dispatch(userSlice.actions.clearAllErrors());
// //   } catch (error) {
// //     dispatch(
// //       userSlice.actions.updateProfileFailed(error.response?.data?.message)
// //     );
// //   }
// // };

// export const resetProfile = () => (dispatch) => {
//   dispatch(userSlice.actions.profileResetAfterUpdate());
// };

// // export const logout = () => async(dispatch) => {
// //     try {
// //         const { data } = await axios.get("http://localhost:4000/api/v1/user/logout",
// //             {withCredentials: true});
// //         dispatch(userSlice.actions.requestSuccess(data.message));
// //         dispatch(userSlice.actions.clearAllErrors());
// //     } catch (error) {
// //         dispatch(userSlice.actions.requestFailed(error.response?.data?.message || "Login failed, Please try again!!!"));
// //     }
// // };

// export const clearUserErrors = () => (dispatch) => {
//   dispatch(userSlice.actions.clearAllErrors());
// };

// export default userSlice.reducer;
