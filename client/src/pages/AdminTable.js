import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminTable = () => {
  const { table } = useParams(); 
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/${table}`)
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }, [table]);

  if (rows.length === 0)
    return <h3 className="text-center mt-5">No data found.</h3>;

  const columns = Object.keys(rows[0]);

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`http://localhost:8080/product/delete/${id}`);
      setRows(rows.filter((row) => row.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="fw-bold text-center mb-4">{table.toUpperCase()}</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
            {table === "products" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col}>{row[col]}</td>
              ))}

              {table === "products" && (
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => navigate(`/admin/product/edit/${row.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteItem(row.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
