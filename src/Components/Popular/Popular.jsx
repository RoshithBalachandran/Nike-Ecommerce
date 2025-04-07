import React, { useEffect, useState } from 'react';
import ProductCard from '../Pages/ProductCard';
import './Popular.css';
const Popular = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/all_product');
        if (!response.ok) throw new Error('Failed to fetch products');

        const data = await response.json();

        console.log('All products fetched:', data);

        const popularProducts = data.slice(0, 5);
        setProducts(popularProducts);

        console.log('Popular products being shown:', popularProducts);

      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading popular products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="popular-products-container">
      <h2>Popular Products</h2>
      <div className="popular-products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Popular;
