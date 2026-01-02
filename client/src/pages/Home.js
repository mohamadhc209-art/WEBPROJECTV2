import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css"; 

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      <div className="home-hero">
        <h1 className="home-title">Shop Smart, Save Big</h1>
        <h2 className="home-subtitle">Mohamad Market Lebanon</h2>

        <button className="shop-btn" onClick={() => navigate("/fruits")}>
          Shop Now
        </button>
      </div>

      <div className="section-box">
        <h2>Our Concept</h2>

        <p>
          Mohamad Market is a Soft-Discounter, Best-Value Supermarket in Lebanon.
          We firmly believe that high quality should not come at a premium price.
        </p>

        <p>
          You can visit us as your go-to discount store in Lebanon to find all the
          fresh groceries you need.
        </p>

        <p>
          With a strong focus on value and variety, Mohamad Market stands out as
          one of the best supermarket experiences in Lebanon, making everyday
          shopping simple and affordable.
        </p>

        <p>
          From pantry staples to the finest fresh groceries Lebanon has to offer,
          we’re here to serve your daily needs.
        </p>
      </div>

      <div className="section-box">
        <h2>Mission</h2>

        <p>
          Our mission is to enhance the well-being of our customers and empower
          them to live fuller lives by providing exceptional value for their
          everyday essentials.
        </p>
      </div>

      <div className="section-box">
        <h2>Vision</h2>

        <p>
          We continuously strive to make our customers' lives better through
          innovation and by exploring different solutions to create the most
          efficient and sustainable shopping experience while minimizing cost
          without compromising quality.
        </p>
      </div>

    </div>
  );
}

export default Home;
