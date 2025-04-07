import React, { useContext } from "react";
import { ShopContext } from "./Context/ShopContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css"; // Add your CSS styles for this page

const CartPage = () => {
  const { cartItems, all_product } = useContext(ShopContext);
  const navigate = useNavigate();

  const cartProductList = all_product.filter(
    (product) => cartItems[product.id] > 0
  );

  if (cartProductList.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart-page-container">
      <h2>🛒 Your Cart</h2>
      <ul>
        {cartProductList.map((product) => (
          <li key={product.id} className="cart-item">
            <img src={product.image} alt={product.name} className="cart-item-image" />
            <div className="cart-item-details">
              <div>{product.name}</div>
              <div>Price: ₹{product.new_price}</div>
              <div>Quantity: {cartItems[product.id]}</div>
              <div>
                Subtotal: ₹{(product.new_price * cartItems[product.id]).toFixed(2)}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/checkout")} className="checkout-button">
        ✅ Proceed to Checkout
      </button>
    </div>
  );
};

export default CartPage;
