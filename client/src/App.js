import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

import NavBar from "./Components/NavBar";
import Home from "./pages/Home";

import Breakfast from "./pages/Breakfast";
import Detergent from "./pages/Detergent";
import Dryfoods_Pantry from "./pages/Dryfoods_Pantry";
import Fruit from "./pages/Fruits";
import Cosmetics from "./pages/Cosmetics";

import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import SuccessPage from "./pages/SuccessPage";
import ReviewOrEditOrder from "./pages/ReviewOrEditOrder";


import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminList from "./pages/AdminList";
import AdminAdd from "./pages/AdminAdd";
import AdminEdit from "./pages/AdminEdit";
import AdminOrders from "./pages/AdminOrders";
import AdminOrderItems from "./pages/AdminOrderItems";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product, qty, price) => {
    setCart((prev) => [...prev, { ...product, qty, price }]);
  };

  const removeItem = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Home />} />

      
        <Route
          path="/breakfast"
          element={
            <>
              <NavBar cartCount={cart.length} />
              <Breakfast addToCart={addToCart} />
            </>
          }
        />
        <Route
          path="/fruits"
          element={
            <>
              <NavBar cartCount={cart.length} />
              <Fruit addToCart={addToCart} />
            </>
          }
        />
        <Route
          path="/dryfood"
          element={
            <>
              <NavBar cartCount={cart.length} />
              <Dryfoods_Pantry addToCart={addToCart} />
            </>
          }
        />
        <Route
          path="/detergent"
          element={
            <>
              <NavBar cartCount={cart.length} />
              <Detergent addToCart={addToCart} />
            </>
          }
        />
        <Route
          path="/cosmetics"
          element={
            <>
              <NavBar cartCount={cart.length} />
              <Cosmetics addToCart={addToCart} />
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <>
              <NavBar cartCount={cart.length} />
              <CartPage cart={cart} removeItem={removeItem} />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <NavBar cartCount={cart.length} />
              <Checkout cart={cart} />
            </>
          }
        />
       <Route path="/success" element={<SuccessPage />} />

        
        <Route path="/review-order" element={<ReviewOrEditOrder />} />

     
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/products" element={<AdminList />} />
        <Route path="/admin/products/add" element={<AdminAdd />} />
        <Route path="/admin/products/edit/:id" element={<AdminEdit />} />

        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/orders/:orderId" element={<AdminOrderItems />} />
      </Routes>
    </Router>
  );
}

export default App;
