import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pluralize, idbPromise } from "../../utils/helpers";
import { addToCart, updateCartQuantity } from "../../utils/cartSlice";

function ProductItem(item) {
  // This component displays a single product item in the product list
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const { image, name, _id, price, quantity } = item; // Example props

  const addToCartHandler = () => {
    // Example dispatch for adding a product to the cart when adding a product to the cart
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    if (itemInCart) {
      // If the product is already in the cart, increment its quantity
      dispatch(
        updateCartQuantity({
          // Example dispatch for updating cart quantity when adding a product to the cart
          _id: _id,
          purchaseQuantity: itemInCart.purchaseQuantity + 1,
        })
      );
      idbPromise("cart", "put", {
        // Example update for IndexedDB when adding a product to the cart
        ...itemInCart,
        purchaseQuantity: itemInCart.purchaseQuantity + 1,
      });
    } else {
      // If the product is not in the cart, add it to the cart
      dispatch(addToCart({ ...item, purchaseQuantity: 1 }));
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={addToCartHandler}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
