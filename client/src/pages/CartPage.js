import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Cart.css";

const CartPage = ({ cart, removeItem }) => {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.qty * parseFloat(item.price),
    0
  );

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-img"
                      />
                    )}
                  </td>

                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.qty}</td>
                  <td>${(item.qty * parseFloat(item.price)).toFixed(2)}</td>

                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.name)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="cart-total">Grand Total: ${total.toFixed(2)}</h2>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
