import React, { useContext } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./Headers.css";
import GlobalState from "../../GlobalState";
import HeaderSearch from "../search/HeaderSearch";
import authApi from "../../api/authApi";

function Headers() {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [cart, setCart] = state.userAPI.cart;

  const logoutUser = async () => {
    await authApi.get(`/user/logout`);
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
    setCart([]);
    window.location.href = "/login";
  };

  return (
    <header className="main-header">
      {/* LOGO */}
      <div className="logo">
        <h1>
          <Link to={isAdmin ? "/admin/dashboard" : "/"}>
            {isAdmin ? "Admin Panel" : "Fcom"}
          </Link>
        </h1>
      </div>

      {/* NAV LINKS */}
      <ul className="nav-links">
        {isAdmin ? (
          <>
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/products">Products</Link>
            </li>
            <li>
              <Link to="/admin/create-product">Create Product</Link>
            </li>
            <li>
              <Link to="/admin/category">Categories</Link>
            </li>
            <li>
              <Link to="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link to="/" onClick={logoutUser}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/">Shop</Link>
            </li>

            {isLogged ? (
              <>
                <li>
                  <Link to="/history">History</Link>
                </li>
                <li className="search-item">
                  <HeaderSearch />
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login / Register</Link>
              </li>
            )}
          </>
        )}
      </ul>

      {/* RIGHT ICONS */}
      <div className="header-right">
        {!isAdmin && (
          <div className="cart-icon">
            <span>{cart.length}</span>
            <Link to="/cart">
              <MdOutlineAddShoppingCart size={28} />
            </Link>
          </div>
        )}

        {isLogged && !isAdmin && (
          <Link to="/profile" className="profile-icon">
            <FaUserCircle size={32} />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Headers;
