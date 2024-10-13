import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  // this is the Redux Toolkit slice for managing category state
  name: "categories",
  initialState: {
    // this is the initial state of the category slice
    categories: [],
    currentCategory: "",
  },
  reducers: {
    // this is where we define the actions that will be dispatched to modify the state
    updateCategories: (state, action) => {
      // this action updates the categories in the state
      state.categories = action.payload;
    },
    updateCurrentCategory: (state, action) => {
      // this action updates the current category in the state
      state.currentCategory = action.payload;
    },
  },
});

export const {
  updateCategories,
  updateCurrentCategory,
} = categorySlice.actions; // this is where we export the actions and reducer for the category slice
export default categorySlice.reducer;
