import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../Context/ShopContext";
import DiscriptionBox from "../DiscriptionBox/DiscriptionBox";
import Relatedproduct from "../Relatedproduct/Relatedproduct";


const ProductDisplay = () => {
    const { productId } = useParams();
    const { all_product, addToCart } = useContext(ShopContext);
    const [product, setProduct] = useState(null);
    const [newPrice, setNewPrice] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (!all_product || all_product.length === 0) {
            setLoading(true);
            return;
        }

        const foundProduct = all_product.find(item => Number(item.id) === Number(productId));

        if (foundProduct) {
            setProduct(foundProduct);
            setNewPrice(foundProduct.new_price ?? 0);
        } else {
            setProduct(null);
        }

        setLoading(false);
    }, [productId, all_product]);

    if (loading) {
        return <h2 className="loading-message">⏳ Loading product...</h2>;
    }

    if (!product) {
        return <h2 className="error-message">❌ Product Not Found</h2>;
    }

    const handleAddToCart = () => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
        if (!loggedInUser) {
            alert("⚠️ You must be logged in to add items to the cart!");
            navigate("/login");
            return;
        }
    
        if (!selectedSize) {
            alert("⚠️ Please select a size before adding to cart!");
            return;
        }
    
        addToCart(product.id);
        alert(`✅ ${product.name} (Size ${selectedSize}) added to cart!`);
    
        // ✅ Navigate to the cart/checkout page
        navigate("/cart");
    };
    

    return (
        <>
            <div className="productdisplay">
                {/* Left Section - Product Images */}
                <div className="productdisplay-left">
                    <div className="productdisplay-img-list">
                        {[...Array(4)].map((_, index) => (
                            <img key={index} src={product.image} alt={`Preview ${index}`} loading="eager" />
                        ))}
                    </div>
                    <div className="productdisplay-img">
                        <img className="productdisplay-main-img" src={product.image} alt={product.name} loading="eager" />
                    </div>
                </div>

                {/* Right Section - Product Details */}
                <div className="productdisplay-right">
                    <h1>{product.name || "Unnamed Product"}</h1>

                    {/* Dynamic Star Rating */}
                    <div className="productdisplay-star">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <img
                                key={index}
                                src={index < (product.rating ?? 4) ? star_icon : star_dull_icon}
                                alt="Star"
                            />
                        ))}
                        <p>({product.reviews ?? 122} Reviews)</p>
                    </div>

                    <div className="productdisplay-right-prices">
                        <div className="productdisplay-old">₹{product.old_price?.toFixed(2) ?? "0.00"}</div>
                        <div className="productdisplay-new">₹{newPrice.toFixed(2)}</div>
                    </div>

                    {/* Size Selection */}
                    <div className="productdisplay-size">
                        <h2>Select Size</h2>
                        <div className="productdisplay-right-size">
                            {[{ size: 7, discount: 100 }, { size: 8, discount: 80 }, { size: 9, discount: 50 }, { size: 10, discount: 0 }].map(({ size, discount }) => (
                                <div
                                    key={size}
                                    className={selectedSize === size ? "selected" : ""}
                                    onClick={() => {
                                        setSelectedSize(size);
                                        setNewPrice(Math.max(product.new_price - discount, 0));
                                    }}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>

                    <div className="productdisplay-right-category">
                        <span>Category: </span>
                        <span>{product.category || "Sports & Athletic Wear"}</span>
                    </div>
                </div>
            </div>

            {/* Description Box */}
            <DiscriptionBox />

            {/* Related Products */}
            <Relatedproduct category={product.category} currentProductId={product.id} />
        </>
    );
};

export default ProductDisplay;


