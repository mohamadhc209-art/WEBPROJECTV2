import React from "react";
import "../Styles/SuccessPage.css";

const SuccessPage = () => {
  return (
    <div className="success-container">
      <div className="success-overlay">
        <div className="success-content">
          <h1>Order Successful</h1>

          <p>
            Thank you for shopping with us.  
            Your order has been received and is being prepared.
          </p>

          <a href="/" className="success-btn">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
