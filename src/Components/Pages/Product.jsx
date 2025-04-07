import React, { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrums from "../Breadcrums/Breadcrums";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import DiscriptionBox from "../DiscriptionBox/DiscriptionBox";
import Relatedproduct from "../Relatedproduct/Relatedproduct";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  // Debugging logs
  useEffect(() => {
    console.log("🛠 Debugging Product Component:");
    console.log("➡️ productId:", productId);
    console.log("➡️ all_product:", all_product);
  }, [productId, all_product]);

  if (!all_product || all_product.length === 0) {
    console.warn("⚠️ No products available! Check ShopContext.");
    return <h2>⚠️ Loading products...</h2>;
  }

  const product = all_product.find((item) => Number(item.id) === Number(productId));

  if (!product) {
    console.error(`❌ Product with ID ${productId} not found!`);
    return <h2>❌ Product Not Found</h2>;
  }

  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DiscriptionBox />
      <Relatedproduct category={product.category} />
    </div>
  );
};

export default Product;

