import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import Cart from "../components/Cart";
import { updateProducts } from "../utils/productSlice";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "../utils/cartSlice";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";

function Detail() {
  // This component displays a single product detail page
  const { id } = useParams();
  const dispatch = useDispatch(); // Example dispatch for cart management

  const products = useSelector((state) => state.products.products);
  const cart = useSelector((state) => state.cart.cart);

  const [currentProduct, setCurrentProduct] = useState({});
  const { loading, data } = useQuery(QUERY_PRODUCTS); // GraphQL query for fetching product data

  useEffect(() => {
    // Fetch the product data when the component mounts
    if (products.length) {
      const product = products.find((product) => product._id === id);
      if (product) setCurrentProduct(product);
    } else if (data) {
      // Update the products in Redux and IndexedDB
      dispatch(updateProducts(data.products));
      data.products.forEach((product) => {
        // Save the product to IndexedDB
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch(updateProducts(indexedProducts));
      }); // Fetch the products from IndexedDB
    }
  }, [products, data, loading, dispatch, id]);

  const addToCartHandler = () => {
    // Add the current product to the cart and IndexedDB
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch(
        updateCartQuantity({
          _id: id,
          purchaseQuantity: itemInCart.purchaseQuantity + 1,
        })
      );
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: itemInCart.purchaseQuantity + 1,
      }); // Update the quantity in IndexedDB
    } else {
      dispatch(addToCart({ ...currentProduct, purchaseQuantity: 1 }));
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCartHandler = () => {
    // Remove the current product from the cart and IndexedDB
    dispatch(removeFromCart(currentProduct._id));
    idbPromise("cart", "delete", { ...currentProduct });
  };

  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>
          <p>{currentProduct.description}</p>
          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button onClick={addToCartHandler}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCartHandler}
            >
              Remove from Cart
            </button>
          </p>
          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
