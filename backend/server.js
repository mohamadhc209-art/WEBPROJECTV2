const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Connection Error:", err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});


app.get("/products", (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


app.get("/products/:category", (req, res) => {
  const category = req.params.category;
  const q = "SELECT * FROM products WHERE category = ?";
  db.query(q, [category], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM products WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(data[0]);
  });
});


app.post("/product/add", (req, res) => {
  const { name, price, category, image } = req.body;
  const q =
    "INSERT INTO products (`name`, `price`, `category`, `image`) VALUES (?,?,?,?)";
  db.query(q, [name, price, category, image], (err) => {
    if (err) return res.json(err);
    return res.json("Product added");
  });
});


app.put("/product/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, price, category, image } = req.body;
  const q =
    "UPDATE products SET name=?, price=?, category=?, image=? WHERE id=?";
  db.query(q, [name, price, category, image, id], (err) => {
    if (err) return res.json(err);
    return res.json("Product updated");
  });
});


app.delete("/product/delete/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM products WHERE id=?";
  db.query(q, [id], (err) => {
    if (err) return res.json(err);
    return res.json("Product deleted");
  });
});


app.post("/order", (req, res) => {
  const {
    fullName,
    mobile,
    address,
    deliveryMethod,
    branch,
    payment,
    totalUSD,
    totalLBP,
    items,
  } = req.body;

  const orderQuery = `
    INSERT INTO orders
    (customerName, mobile, address, deliveryMethod, branch, payment, totalUSD, totalLBP)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    orderQuery,
    [
      fullName,
      mobile,
      address,
      deliveryMethod,
      branch,
      payment,
      totalUSD,
      totalLBP,
    ],
    (err, result) => {
      if (err) return res.json(err);

      const orderId = result.insertId;
      const parsedItems = Array.isArray(items) ? items : JSON.parse(items);

      const values = parsedItems.map((item) => [
        orderId,
        item.id,
        item.name,
        item.qty,
        item.price,
      ]);

      const itemsQuery =
        "INSERT INTO order_items (`order_id`, `product_id`, `productName`, `qty`, `price`) VALUES ?";

      db.query(itemsQuery, [values], (err2) => {
        if (err2) return res.json(err2);
        return res.json("Order submitted");
      });
    }
  );
});



app.get("/orders", (req, res) => {
  const q = "SELECT * FROM orders ORDER BY created_at DESC";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/order-items/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  const q = "SELECT * FROM order_items WHERE order_id = ?";
  db.query(q, [orderId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


app.get("/customer-orders/:name", (req, res) => {
  const customerName = req.params.name;

  const q1 = "SELECT * FROM orders WHERE customerName = ?";
  db.query(q1, [customerName], (err, orders) => {
    if (err) return res.json(err);

    if (orders.length === 0) {
      return res.json({ message: "No orders found" });
    }

    const orderIds = orders.map((o) => o.id);
    const q2 = "SELECT * FROM order_items WHERE order_id IN (?)";

    db.query(q2, [orderIds], (err2, items) => {
      if (err2) return res.json(err2);
      return res.json({ customer: customerName, orders, items });
    });
  });
});


app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  const q = "SELECT * FROM admin_users WHERE username=? AND password=?";
  db.query(q, [username, password], (err, result) => {
    if (err) return res.json({ success: false });
    if (result.length === 0) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    return res.json({ success: true, admin: result[0] });
  });
});


app.listen(port, () => {
  console.log("Server running on port " + port);
});
