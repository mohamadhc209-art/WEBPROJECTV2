import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryComboBox from "../Components/CategoryComboBox";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminAdd = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategory = (category) => {
    setProduct({ ...product, category });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.category || !product.image) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post(
        "https://webprojectv2-1-backend1.onrender.com/product/add",
        product
      );
      alert("Product added");
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      alert("Add failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Product</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />

        <CategoryComboBox value={product.category} onChange={handleCategory} />

        <input
          className="form-control mb-2"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
        />

        <button className="btn btn-success" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AdminAdd;
