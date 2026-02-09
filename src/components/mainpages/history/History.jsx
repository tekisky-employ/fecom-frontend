import React, { useEffect, useState, useContext } from "react";
import GlobalState from "../../../GlobalState";
import "./History.css";
import authApi from "../../../api/authApi";

export const History = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        const res = await authApi.get(`/api/history`, {
          headers: { Authorization: token },
        });
        setOrders(res.data);
      };
      getHistory();
    }
  }, [token]);

  return (
    <div className="history-page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders yet. Start shopping now! 🛒</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <span className="order-id">Order ID: {order._id}</span>
              <span className={`order-status status-${order.status}`}>
                {order.status}
              </span>
            </div>

            <div className="order-total">Total: ₹{order.total}</div>

            <div className="order-items">
              {order.cart.map((item) => (
                <div className="order-item" key={item._id}>
                  <div className="item-info">
                    <img src={item.images?.url} alt={item.title} />
                    <span>{item.title}</span>
                  </div>
                  <span className="item-quantity">
                    {item.quantity} × ₹{item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
