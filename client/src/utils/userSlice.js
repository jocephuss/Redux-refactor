import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  // this is the Redux Toolkit slice for managing user data state
  name: "user",
  initialState: {
    // this is the initial state of the user data
    userData: null,
  }, // this is where we define the actions that will be dispatched to modify the state
  reducers: {
    setUserOrders: (state, action) => {
      // this action sets the user's orders in the state
      state.userData = action.payload;
    },
  },
});

export const { setUserOrders } = userSlice.actions;
export default userSlice.reducer;
