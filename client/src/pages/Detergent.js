import React, { useState, useEffect } from "react";
import "../Styles/Detergant.css";
import axios from "axios";

const Detergent = ({ addToCart }) => {
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    axios
      .get("https://webprojectv2-1-backend1.onrender.com/products/detergent")
      .then((res) => {
        setItems(res.data);
        setQuantities(Array(res.data.length).fill(1));
      })
      .catch((err) => console.log(err));
  }, []);

  const increaseQty = (index) => {
    setQuantities((prev) =>
      prev.map((q, i) => (i === index ? q + 1 : q))
    );
  };

  const decreaseQty = (index) => {
    setQuantities((prev) =>
      prev.map((q, i) => (i === index && q > 1 ? q - 1 : q))
    );
  };

  const handleAdd = (item, index) => {
    addToCart(item, quantities[index], item.price);
    alert(`${item.name} added to cart`);
  };

  return (
    <div className="products-container">
      <h1>Detergent & Cleaning</h1>

      <div className="products-grid">
        {items.map((item, index) => (
          <div className="product-card" key={item.id}>
            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>
            <p className="price">${item.price}</p>

            <div className="qty-container">
              <button
                className="qty-btn minus"
                onClick={() => decreaseQty(index)}
              >
                –
              </button>

              <span className="qty-value">{quantities[index]}</span>

              <button
                className="qty-btn plus"
                onClick={() => increaseQty(index)}
              >
                +
              </button>
            </div>

            <button
              className="add-cart-btn"
              onClick={() => handleAdd(item, index)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detergent;
