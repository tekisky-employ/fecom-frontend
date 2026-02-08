import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h4>ABOUT</h4>
          <p>Fcom is an online shopping platform built with MERN stack.</p>
        </div>

        <div className="footer-col">
          <h4>QUICK LINKS</h4>
          <a href="/">Home</a>
          <a href="/cart">Cart</a>
          <a href="/login">Login</a>
        </div>

        <div className="footer-col">
          <h4>HELP</h4>
          <a href="#">Payments</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
        </div>

        <div className="footer-col">
          <h4>CONTACT</h4>
          <p>Email: fsstecom@gmail.com</p>
          <p>Phone: +91 8793368447</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Fcom. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
