import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaPhone, FaEdit, FaStar } from "react-icons/fa";
import "../Styles/ReviewOrEditOrder.css";

const ReviewOrEditOrder = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("review");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !text) {
      alert("Please fill all fields");
      return;
    }

    let typeText = "";
    if (type === "review") {
      typeText = "Review";
    } else {
      typeText = "Edit Order";
    }

    const whatsappMessage =
      "Name: " +
      name +
      "\nPhone: " +
      phone +
      "\nType: " +
      typeText +
      "\nMessage: " +
      text;

    window.location.href =
      "https://wa.me/96176649652?text=" +
      encodeURIComponent(whatsappMessage);
  };

  let messageLabel = "";
  let messagePlaceholder = "";

  if (type === "review") {
    messageLabel = "Your Review";
    messagePlaceholder = "Write your review here...";
  } else {
    messageLabel = "What do you want to change?";
    messagePlaceholder = "Describe the changes you want...";
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg p-4 review-card">
            <h3 className="text-center fw-bold mb-4 text-primary">
              Review or Edit Order
            </h3>

            <form onSubmit={handleSubmit}>
            
              <label className="form-label fw-semibold">
                <FaUser className="me-2" />
                Full Name
              </label>
              <input
                className="form-control mb-3"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

             
              <label className="form-label fw-semibold">
                <FaPhone className="me-2" />
                Phone Number
              </label>
              <input
                className="form-control mb-3"
                placeholder="03 123 456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

           
              <label className="form-label fw-semibold">
                Choose Option
              </label>

              <div className="d-flex gap-4 mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={type === "review"}
                    onChange={() => setType("review")}
                  />
                  <label className="form-check-label">
                    <FaStar className="me-1 text-warning" />
                    Review
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    checked={type === "edit"}
                    onChange={() => setType("edit")}
                  />
                  <label className="form-check-label">
                    <FaEdit className="me-1 text-primary" />
                    Edit Order
                  </label>
                </div>
              </div>

           
              <label className="form-label fw-semibold">
                {messageLabel}
              </label>

              <textarea
                className="form-control mb-4"
                rows="4"
                placeholder={messagePlaceholder}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <button className="btn btn-primary w-100 fw-bold py-2">
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrEditOrder;
