import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CategoryComboBox from "../Components/CategoryComboBox";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://webprojectv2-1-backend1.onrender.com/product/" + id
      )
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.log(err);
        alert("Product not found");
      });
  }, [id]);

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleCategory = (category) =>
    setProduct({ ...product, category });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        "https://webprojectv2-1-backend1.onrender.com/product/update/" + id,
        product
      );
      alert("Product updated");
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Edit Product</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          value={product.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="price"
          value={product.price}
          onChange={handleChange}
        />

        <CategoryComboBox value={product.category} onChange={handleCategory} />

        <input
          className="form-control mb-2"
          name="image"
          value={product.image}
          onChange={handleChange}
        />

        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default AdminEdit;
