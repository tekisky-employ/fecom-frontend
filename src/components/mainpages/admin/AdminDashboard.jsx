import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import GlobalState from "../../../GlobalState";

function AdminDashboard() {
  const state = useContext(GlobalState);
  const [token] = state.token;

  // const [stats, setStats] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    recentOrders: [],
  });

  useEffect(() => {
    if (!token) return; // 🔥 VERY IMPORTANT
    getStats();
  }, [token]);

  const getStats = async () => {
    try {
      const res = await axios.get("/api/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(res.data);
    } catch (err) {
      console.log(err.response?.data);
      alert("Cannot load dashboard");
    }
  };

  if (!stats) return <h2>Loading...</h2>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="stats-grid">
        <div className="card">
          <h3>{stats.totalOrders}</h3>
          <p>Total Orders</p>
        </div>

        <div className="card">
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>

        <div className="card">
          <h3>{stats.totalProducts}</h3>
          <p>Total Products</p>
        </div>

        <div className="card">
          <h3>₹ {stats.totalRevenue}</h3>
          <p>Total Revenue</p>
        </div>
      </div>

      <div className="recent-orders">
        <h3>Recent Orders</h3>

        {stats.recentOrders?.map((o) => (
          <div className="order-row" key={o._id}>
            <span>{o.user?.name || "Guest"}</span>
            <span>₹ {o.total}</span>
            <span>{new Date(o.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;

// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import "./AdminDashboard.css";
// import GlobalState from "../../../GlobalState";

// function AdminDashboard() {
//   const state = useContext(GlobalState);
//   const [token] = state.token;

//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalUsers: 0,
//     totalProducts: 0,
//     totalRevenue: 0,
//     recentOrders: [],
//   });

//   useEffect(() => {
//     if (token) getStats();
//   }, [token]);

//   const getStats = async () => {
//     try {
//       const res = await axios.get("/api/dashboard/stats", {
//         headers: { Authorization: token },
//       });
//       console.log("API DATA:", res.data);
//       setStats(res.data);
//     } catch (err) {
//       alert("Cannot load dashboard");
//     }
//   };

//   if (!stats) return <h2>Loading...</h2>;

//   return (
//     <div className="admin-dashboard">
//       <h2>Admin Dashboard</h2>

//       {/* STATS CARDS */}
//       <div className="stats-grid">
//         <div className="card">
//           <h3>{stats.totalOrders}</h3>
//           <p>Total Orders</p>
//         </div>

//         <div className="card">
//           <h3>{stats.totalUsers}</h3>
//           <p>Total Users</p>
//         </div>

//         <div className="card">
//           <h3>{stats.totalProducts}</h3>
//           <p>Total Products</p>
//         </div>

//         <div className="card">
//           <h3>₹ {stats.totalRevenue}</h3>
//           <p>Total Revenue</p>
//         </div>
//       </div>

//       {/* RECENT ORDERS */}
//       <div className="recent-orders">
//         <h3>Recent Orders</h3>

//         {stats.recentOrders?.map((o) => (
//           <div className="order-row" key={o._id}>
//             <span>{o.user?.name}</span>
//             <span>₹ {o.total}</span>
//             <span>{new Date(o.createdAt).toLocaleDateString()}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;
