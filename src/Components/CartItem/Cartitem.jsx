import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import "./Cartitem.css";

const Cartitem = () => {
  const { cartItems, all_product, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on load
    const storedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCart && setCartItems) {
      setCartItems(storedCart);
    }
  }, [setCartItems]);

  const applyPromoCode = () => {
    if (promoCode.trim() === "Roshith9745") {
      setDiscount(0.1);
      alert("✅ Promo code applied! You got 10% off.");
    } else {
      setDiscount(0);
      alert("❌ Invalid promo code.");
    }
  };

  if (
    !Array.isArray(all_product) ||
    all_product.length === 0 ||
    !cartItems ||
    Object.keys(cartItems).length === 0
  ) {
    return <p className="loading">⏳ Loading cart...</p>;
  }

  const cartProductList = all_product.filter(
    (product) => cartItems[product.id] > 0
  );

  const handleCheckout = async () => {
    if (!loggedInUser?.id) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    const itemsToSave = cartProductList.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.new_price,
      quantity: cartItems[product.id],
    }));

    if (itemsToSave.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const total = itemsToSave.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const discountedTotal = total * (1 - discount);

    const cart = {
      userId: loggedInUser.id,
      items: itemsToSave,
      userDetails: {},
      total: discountedTotal,
    };

    try {
      const existingRes = await fetch(
        `http://localhost:3001/carts?userId=${loggedInUser.id}`
      );
      const existingData = await existingRes.json();

      if (existingData.length > 0) {
        await fetch(`http://localhost:3001/carts/${existingData[0].id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...existingData[0], ...cart }),
        });
      } else {
        await fetch("http://localhost:3001/carts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cart),
        });
      }

      navigate("/checkout");
    } catch (err) {
      console.error("Error saving cart:", err);
      alert("❌ Failed to save cart.");
    }
  };

  const subtotal = cartProductList.reduce(
    (sum, product) => sum + product.new_price * cartItems[product.id],
    0
  );

  const discountAmount = subtotal * discount;
  const grandTotal = subtotal - discountAmount;

  return (
    <div className="cart-container">
      <h2 className="cart-heading">🛒 Your Cart</h2>

      {cartProductList.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartProductList.map((product) => (
              <li key={product.id} className="cart-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-image"
                />
                <div className="cart-details">
                  <div className="item-name">{product.name}</div>
                  <div className="item-info">
                    <div className="quantity-controls">
                      <button
                        onClick={() => {
                          if (cartItems[product.id] > 1) {
                            const updatedCart = {
                              ...cartItems,
                              [product.id]: cartItems[product.id] - 1,
                            };
                            product.new_price = product.new_price / 2;
                            setCartItems(updatedCart);
                            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                          }
                        }}
                      >
                        -
                      </button>
                      <span>{cartItems[product.id]}</span>
                      <button
                        onClick={() => {
                          const updatedCart = {
                            ...cartItems,
                            [product.id]: cartItems[product.id] + 1,
                          };
                          product.new_price = product.new_price * 2;
                          setCartItems(updatedCart);
                          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                        }}
                      >
                        +
                      </button>
                    </div>
                    <span>Price: ₹{product.new_price}</span>
                    <span>
                      Subtotal: ₹
                      {(product.new_price * cartItems[product.id]).toFixed(2)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="promo-code-section">
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={applyPromoCode}>Apply</button>
          </div>

          <div className="total-summary">
            <h3>Order Summary</h3>
            <p>
              <strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}
            </p>
            <p>
              <strong>Discount:</strong> -₹{discountAmount.toFixed(2)}
            </p>
            <p>
              <strong>Grand Total:</strong> ₹{grandTotal.toFixed(2)}
            </p>
          </div>

          <button onClick={handleCheckout} className="checkout-button">
            ✅ Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cartitem;
