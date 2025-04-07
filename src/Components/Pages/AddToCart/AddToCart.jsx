import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddToCart.css";

const AddToCart = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    pinCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cartData, setCartData] = useState(null); // null = not loaded yet
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
   
    if (!loggedInUser?.id) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    const fetchCartData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/carts?userId=${loggedInUser.id}`);
        const data = await res.json();

        if (!data || data.length === 0 || !data[0].items || data[0].items.length === 0) {
          setCartData([]); 
          
          return;
        }

        setCartData(data[0].items);

        const storedDetails = data[0].userDetails || {};
        const isValid =
          storedDetails.name?.trim().toLowerCase() !== "guest" &&
          storedDetails.address?.trim().length > 0 &&
          /^\d{6}$/.test(storedDetails.pinCode);

        if (isValid) {
          setUserDetails(storedDetails);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        alert("Could not load cart.");
        navigate("/cart");
      }
    };

    fetchCartData();
  }, [loggedInUser, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const getTotalAmount = () => {
    if (!cartData) return 0;
    return cartData.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    if (!userDetails.name.trim()) return alert("Enter your name.");
    if (!userDetails.address.trim()) return alert("Enter your address.");
    if (!/^\d{6}$/.test(userDetails.pinCode)) return alert("Pin Code must be 6 digits.");
    if (!paymentMethod) return alert("Select a payment method.");
    if (!cartData || cartData.length === 0) return alert("Cart is empty!");

    const orderData = {
      userDetails,
      items: cartData,
      total: getTotalAmount(),
      paymentMethod,
      userId: loggedInUser?.id,
      date: new Date().toISOString(),
    };

    setLoading(true);
    try {
      // POST order to orders
      await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      // Clear cart
      const cartRes = await fetch(`http://localhost:3001/carts?userId=${loggedInUser.id}`);
      const cart = await cartRes.json();
      if (cart.length > 0) {
        await fetch(`http://localhost:3001/carts/${cart[0].id}`, {
          method: "DELETE",
        });
      }

      setOrderPlaced(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Order Error:", err);
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (cartData === null) return <div className="checkout-box">Loading cart...</div>;

  return (
    <div className="addtocart-container">
      {orderPlaced ? (
        <div className="order-success">
          <h2>🎉 Order placed successfully!</h2>
          <p>Redirecting to homepage...</p>
        </div>
      ) : (
        <div className="checkout-box">
          <h2>🛒 Checkout</h2>

          <div className="user-details">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userDetails.name}
              onChange={handleInputChange}
              autoComplete="name"
              required
            />
            <textarea
              name="address"
              placeholder="Full Address"
              value={userDetails.address}
              onChange={handleInputChange}
              required
              rows={3}
            />
            <input
              type="text"
              name="pinCode"
              placeholder="6-digit Pin Code"
              value={userDetails.pinCode}
              onChange={handleInputChange}
              maxLength={6}
              pattern="\d{6}"
              required
            />
          </div>

          <div className="payment-method">
            <h3>Select Payment Method:</h3>
            <label>
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                value="Online"
                checked={paymentMethod === "Online"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Online Payment
            </label>
          </div>

          <div className="summary">
            <h3>Total: ₹{getTotalAmount().toFixed(2)}</h3>
            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
