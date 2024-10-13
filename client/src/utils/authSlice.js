import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  // this is the Redux Toolkit slice for managing authentication state
  name: "auth",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    //this is where we define the actions that will be dispatched to modify the state
    setUserAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      // this action logs the user out by setting the isAuthenticated state to false
      state.isAuthenticated = false;
    },
  },
});

export const { setUserAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer;
