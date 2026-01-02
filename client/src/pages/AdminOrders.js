import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://webprojectv2-1-backend1.onrender.com/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filtered = orders.filter((o) =>
    (o.customerName || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3>Orders</h3>

      <input
        className="form-control mb-3"
        placeholder="Search customer name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total USD</th>
            <th>View Items</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customerName}</td>
              <td>{o.totalUSD}</td>
              <td>
                <Link
                  to={`/admin/orders/${o.id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Items
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
