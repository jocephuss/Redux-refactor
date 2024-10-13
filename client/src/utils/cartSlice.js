import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  // this is the Redux Toolkit slice for managing cart state
  name: "cart",
  initialState: {
    // this is the initial state of the cart
    cart: [],
    cartOpen: false,
  },
  reducers: {
    // this is where we define the actions that will be dispatched to modify the state
    addToCart: (state, action) => {
      state.cartOpen = true;
      state.cart.push(action.payload);
    }, // this action adds multiple items to the cart at once
    addMultipleToCart: (state, action) => {
      state.cart.push(...action.payload);
    },
    updateCartQuantity: (state, action) => {
      // this action updates the quantity of a single item in the cart
      state.cartOpen = true;
      const item = state.cart.find(
        (product) => product._id === action.payload._id
      );
      if (item) {
        item.purchaseQuantity = action.payload.purchaseQuantity;
      }
    }, // this action updates the quantity of a single item in the cart
    removeFromCart: (state, action) => {
      // this action removes a single item from the cart
      state.cart = state.cart.filter(
        (product) => product._id !== action.payload
      );
      state.cartOpen = state.cart.length > 0;
    },
    clearCart: (state) => {
      // this action clears the cart and closes the cart drawer
      state.cart = [];
      state.cartOpen = false;
    },
    toggleCart: (state) => {
      // this action toggles the visibility of the cart drawer (open or closed)
      state.cartOpen = !state.cartOpen;
    },
  },
});

export const {
  // this is where we export the actions and reducer for the cart slice
  addToCart,
  addMultipleToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  toggleCart,
} = cartSlice.actions;
export default cartSlice.reducer;
