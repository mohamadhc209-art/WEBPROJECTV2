import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminOrderItems = () => {
  const { orderId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://webprojectv2-1-backend1.onrender.com/order-items/" + orderId
      )
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, [orderId]);

  return (
    <div className="container mt-4">
      <h3>Items for Order #{orderId}</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td>{i.productName}</td>
              <td>{i.qty}</td>
              <td>{i.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderItems;
