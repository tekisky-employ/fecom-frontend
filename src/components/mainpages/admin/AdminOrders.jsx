import React, { useContext, useEffect, useState } from "react";
import "./AdminOrders.css";
import GlobalState from "../../../GlobalState";
import authApi from "../../../api/authApi";

const AdminOrders = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (token) getAllOrders();
  }, [token]);

  // ✅ GET ALL ORDERS (ADMIN)
  const getAllOrders = async () => {
    try {
      const res = await authApi.get(
        `/api/order`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setOrders(res.data);
    } catch (err) {
      alert(err.response?.data?.msg || "Cannot load orders");
    }
  };

  // ✅ UPDATE ORDER STATUS
  const updateStatus = async (id, status) => {
    try {
      await authApi.patch(
        `/api/order/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // refresh orders
      getAllOrders();
    } catch (err) {
      alert(err.response?.data?.msg || "Status update failed");
    }
  };

  return (
    <div className="admin-orders">
      <h2>All Orders (Admin)</h2>

      {orders.length === 0 && <p>No orders found</p>}

      <div className="order-list">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h4>Order ID: {order._id}</h4>
            <p>
              User: {order.user?.name} ({order.user?.email})
            </p>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <p className={`status ${order.status.toLowerCase()}`}>
              Status: {order.status}
            </p>

            {/* PRODUCTS */}
            <div className="order-products">
              {order.cart.map((item) => (
                <div className="order-item" key={item._id}>
                  <img
                    src={item.images?.url || item.product?.images?.url}
                    alt={item.title}
                  />
                  <div>
                    <p>{item.title}</p>
                    <p>
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <h4 className="total">
              Total: ₹
              {order.cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0,
              )}
            </h4>

            {/* STATUS UPDATE */}
            <div className="status-box">
              <label>Update:</label>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
