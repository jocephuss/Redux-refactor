import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategories,
  updateCurrentCategory,
} from "../../utils/categorySlice";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function CategoryMenu() {
  // This component displays a menu of categories
  const dispatch = useDispatch(); // Get the Redux dispatch function
  const categories = useSelector((state) => state.categories.categories);

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    // Fetch categories from the GraphQL API if they don't exist or are outdated
    if (categoryData) {
      // Update the Redux store with the fetched categories and store them in IndexedDB
      dispatch(updateCategories(categoryData.categories));
      categoryData.categories.forEach((category) => {
        // Example update for IndexedDB when adding a category to the store
        idbPromise("categories", "put", category);
      }); // Fetch categories from IndexedDB if they exist and update the Redux store if they don't exist or are outdated
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch(updateCategories(categories)); // Example update for IndexedDB when adding a category to the store
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    // Example dispatch for updating the current category when selecting a category from the menu
    dispatch(updateCurrentCategory(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
      <button
        onClick={() => {
          handleClick("");
        }}
      >
        All
      </button>
    </div>
  );
}

export default CategoryMenu;
