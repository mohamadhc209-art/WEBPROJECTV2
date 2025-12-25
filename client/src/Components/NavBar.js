import React from "react";
import { Link } from "react-router-dom";
import "../Styles/NavBar.css";

function NavBar() {
  return (
    <div className="navbar">
      {}
      <div className="leftSide">
        <Link to="/cart" className="cart-btn" aria-label="Cart">
          🛒
        </Link>
      </div>

      {}
      <div className="rightSide">
        <Link to="/fruits">Fruits</Link>
        <Link to="/cosmetics">Cosmetics</Link>
        <Link to="/breakfast">Breakfast</Link>
        <Link to="/detergent">Detergent</Link>
        <Link to="/dryfood">Dry Foods_Pantry</Link>
        <Link to="/review-order">Contact Us</Link>
      </div>
    </div>
  );
}

export default NavBar;
