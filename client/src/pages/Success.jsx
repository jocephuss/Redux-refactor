import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import Jumbotron from "../components/Jumbotron";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
import { clearCart } from "../utils/cartSlice";

function Success() {
  // This component handles the success page
  const dispatch = useDispatch(); // Example dispatch for cart management
  const [addOrder] = useMutation(ADD_ORDER); // GraphQL mutation for adding an order

  useEffect(() => {
    // Save the order when the component mounts
    async function saveOrder() {
      // Make the GraphQL mutation request
      const cart = await idbPromise("cart", "get");
      const products = cart.map((item) => item._id); // Get the product IDs from the cart items

      if (products.length) {
        // Make the API request to add the order
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        // Clear items from IndexedDB and Redux cart state
        productData.forEach((item) => {
          // Remove the item from IndexedDB
          idbPromise("cart", "delete", item);
        });

        // Dispatch to clear the Redux cart state
        dispatch(clearCart());
      }

      setTimeout(() => {
        // Redirect to the home page after 3 seconds
        window.location.assign("/");
      }, 3000);
    }

    saveOrder(); // Save the order when the component mounts
  }, [addOrder, dispatch]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
