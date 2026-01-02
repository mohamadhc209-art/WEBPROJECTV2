import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaPhone, FaTruck, FaStore, FaMoneyBill } from "react-icons/fa";

function Checkout({ cart }) {
  const navigate = useNavigate();

  const totalUSD = cart.reduce(
    (sum, item) => sum + item.qty * parseFloat(item.price),
    0
  );

  const totalLBP = totalUSD * 89600;

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    address: "",
    deliveryMethod: "pickup",
    branch: "",
    payment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName || !form.mobile || !form.payment) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await axios.post("https://webprojectv2-1-backend1.onrender.com/order", {
        fullName: form.fullName,
        mobile: form.mobile,
        address: form.address,
        deliveryMethod: form.deliveryMethod,
        branch: form.branch,
        payment: form.payment,
        totalUSD: totalUSD.toFixed(2),
        totalLBP: totalLBP,

       
        items: cart.map((item) => ({
          id: item.id,          
          name: item.name,
          qty: item.qty,
          price: item.price,
        })),
      });

      alert("Order submitted successfully!");
      navigate("/success");
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to submit order.");
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-8 mb-4">
          <div className="p-4 shadow rounded bg-white">
            <h2 className="mb-4 text-primary fw-bold">
              <FaTruck className="me-2" />
              Checkout
            </h2>

            <form onSubmit={handleSubmit}>
              <label className="form-label fw-semibold">
                Full Name <FaUser />
              </label>
              <input
                type="text"
                name="fullName"
                className="form-control mb-3"
                value={form.fullName}
                onChange={handleChange}
              />

              <label className="form-label fw-semibold">
                Mobile Number <FaPhone />
              </label>
              <input
                type="tel"
                name="mobile"
                className="form-control mb-3"
                value={form.mobile}
                onChange={handleChange}
              />

              <label className="form-label fw-semibold">
                Delivery Method <FaTruck />
              </label>
              <select
                name="deliveryMethod"
                className="form-select mb-3"
                value={form.deliveryMethod}
                onChange={handleChange}
              >
                <option value="pickup">Pickup from Branch</option>
                <option value="delivery">Home Delivery</option>
              </select>

              {form.deliveryMethod === "pickup" && (
                <>
                  <label className="form-label fw-semibold">
                    Pickup Branch <FaStore />
                  </label>
                  <input
                    type="text"
                    name="branch"
                    className="form-control mb-3"
                    value={form.branch}
                    onChange={handleChange}
                  />
                </>
              )}

              {form.deliveryMethod === "delivery" && (
                <>
                  <label className="form-label fw-semibold">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="form-control mb-3"
                    value={form.address}
                    onChange={handleChange}
                  />
                </>
              )}

              <label className="form-label fw-semibold">
                Payment Method <FaMoneyBill />
              </label>
              <select
                name="payment"
                className="form-select mb-4"
                value={form.payment}
                onChange={handleChange}
              >
                <option value="">Choose a payment method</option>
                <option value="usd">USD</option>
                <option value="lbp">LBP</option>
              </select>

              <button className="btn btn-primary w-100 py-2 fw-bold">
                Submit Order
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-4 col-md-8">
          <div className="p-4 shadow rounded bg-white">
            <h4 className="text-primary fw-bold mb-3">🧾 Order Summary</h4>
            <hr />

            {cart.map((item, index) => (
              <div key={index} className="mb-3 pb-2 border-bottom">
                <h5 className="fw-semibold">{item.name}</h5>
                <p>Qty: {item.qty}</p>
                <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
              </div>
            ))}

            <h5 className="fw-bold text-primary">
              Total USD: ${totalUSD.toFixed(2)}
            </h5>
            <h5 className="fw-bold text-primary">
              Total LBP: {totalLBP.toLocaleString()} LBP
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
