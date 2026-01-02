import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://webprojectv2-1-backend1.onrender.com/products")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(
        "https://webprojectv2-1-backend1.onrender.com/product/delete/" + id
      );
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Admin Products</h3>

     
      <Link to="/admin/products/add" className="btn btn-success mb-3">
        Add Product
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
               
                <Link
                  to={`/admin/products/edit/${item.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminList;
