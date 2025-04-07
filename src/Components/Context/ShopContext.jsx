import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
    const [all_product, setAllProduct] = useState([]);
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3001/all_product")
            .then(res => setAllProduct(res.data))
            .catch(err => console.error("Failed to fetch products:", err));
    }, []);

    const addToCart = (productId) => {
        setCartItems(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }));
    };

    return (
        <ShopContext.Provider value={{ all_product, cartItems, addToCart }}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopProvider;
