import React, { createContext, useReducer, useEffect } from "react";

// Create the ProductContext
export const ProductContext = createContext();

// Reducer function to handle product actions
const reducer = (state, action) => {
  switch (action.type) {
    case "set":
      return action.data;

    case "add":
      return [...state, action.data];

    case "delete":
      return state.filter((p) => p.id !== action.data);

    case "edit":
    case "update":
      return state.map((p) =>
        p.id === action.data.id ? action.data : p
      );

    case "bulk":
      return action.data;

    default:
      return state;
  }
};

// Provider component that wraps your app
export const ProductProvider = ({ children }) => {
  const [products, dispatch] = useReducer(reducer, []);

  // Fetch product list from server on load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/all_product");
        const data = await res.json();
        dispatch({ type: "set", data });
        console.log("✅ Products fetched successfully:", data);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Function to dispatch product-related actions
  const updateProduct = (action) => {
    dispatch(action);
  };

  return (
    <ProductContext.Provider value={{ products, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
