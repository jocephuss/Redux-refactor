import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./utils/authSlice";
import cartReducer from "./utils/cartSlice";
import categoryReducer from "./utils/categorySlice";
import productReducer from "./utils/productSlice";
import userReducer from "./utils/userSlice";

const store = configureStore({
  // below is the Redux Toolkit store configuration
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    categories: categoryReducer,
    products: productReducer,
    user: userReducer,
  },
});

export default store;
