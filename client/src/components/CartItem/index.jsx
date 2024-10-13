import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../../utils/cartSlice";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  //this component takes a cart item as a prop
  const dispatch = useDispatch();

  const removeFromCartHandler = (item) => {
    //this function removes the cart item from the store and IndexedDB
    dispatch(removeFromCart(item._id));
    idbPromise("cart", "delete", { ...item });
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch(removeFromCart(item._id)); // remove from IndexedDB as well
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch(
        updateCartQuantity({ _id: item._id, purchaseQuantity: parseInt(value) })
      );
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${item.image}`} alt={item.name} />
      </div>
      <div>
        <div>
          {item.name}, ${item.price}
        </div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChangeHandler}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCartHandler(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
