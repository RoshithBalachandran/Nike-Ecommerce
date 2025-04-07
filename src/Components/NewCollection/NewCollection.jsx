import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewCollection.css";

const NewCollection = () => {
  const [collectionData, setCollectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await fetch("http://localhost:3001/all_product");
        const data = await res.json();
        const slicedData = data.slice(40, 48); 
        setCollectionData(slicedData);
      } catch (err) {
        console.error("Error fetching collection:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollection();
  }, []);

  if (loading) return <p>Loading New Collection...</p>;

  return (
    <div className="new-collection">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="main-collection">
        {collectionData.map((item) => (
          <div
            key={item.id}
            className="collection-item"
            onClick={() => navigate(`/product/${item.id}`)}
          >
            <img src={item.image} alt={item.name} loading="lazy" />
            <h3>{item.name}</h3>
            <p>
              New Price: <strong>₹{Number(item.new_price).toFixed(2)}</strong>
            </p>
            <p className="old-price">
              Old Price: <s>₹{Number(item.old_price).toFixed(2)}</s>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCollection;
