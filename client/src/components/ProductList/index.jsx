import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../ProductItem";
import { updateProducts } from "../../utils/productSlice";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";

function ProductList() {
  // This component displays a list of products
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const currentCategory = useSelector(
    // Get the current category from the Redux store) =>
    (state) => state.categories.currentCategory
  );

  const { loading, data } = useQuery(QUERY_PRODUCTS); // GraphQL query for fetching products

  useEffect(() => {
    if (data) {
      // Update the Redux store with the fetched products and store them in IndexedDB
      dispatch(updateProducts(data.products));
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      // Fetch products from the GraphQL API if they don't exist or are outdated
      idbPromise("products", "get").then((products) => {
        dispatch(updateProducts(products));
      });
    } // Fetch products from IndexedDB if they exist and update the Redux store if they don't exist or are outdated
  }, [data, loading, dispatch]);

  function filterProducts() {
    // Filter products based on the current category
    if (!currentCategory) {
      return products;
    }
    return products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
