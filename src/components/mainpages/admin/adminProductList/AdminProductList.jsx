import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AdminProductList.css";
import GlobalState from "../../../../GlobalState";
import Pagination from "../../../pagination/pagination";

function AdminProductList() {
  const state = useContext(GlobalState);
  // const [products, setProducts] = useState([]);
  const [token] = state.token;
  const [page, setPage] = state.productAPI.page;
  const [total] = state.productAPI.total;
  const [products] = state.productAPI.products;

  //   const [products, setProducts] = useState([]);

  // const fetchProducts = async () => {
  //   const res = await axios.get("/api/products");
  //   setProducts(res.data.data);
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await axios.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="admin-products">
      <div className="admin-products-header">
        <h2>All Products</h2>
        <Link to="/admin/create-product" className="btn-add">
          + Add Product
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>
                <img src={p.images.url} alt={p.title} />
              </td>
              <td>{p.title}</td>
              <td>₹{p.price}</td>
              <td>{p.category?.name || "—"}</td>
              <td className="actions">
                <Link to={`/admin/edit-product/${p._id}`} className="btn-edit">
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} setPage={setPage} total={total} limit={6} />
    </div>
  );
}

export default AdminProductList;
