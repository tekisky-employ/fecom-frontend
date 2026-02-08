import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./ProductForm.css";
import GlobalState from "../../../../GlobalState";

const initialState = {
  product_id: "",
  title: "",
  price: "",
  description: "",
  content: "",
  category: "",
};

function ProductForm({ isEdit = false, productId = null }) {
  const state = useContext(GlobalState);

  const [token] = state.token;
  const categoriesAPI = state.categoriesAPI;
  const categories = categoriesAPI?.categories?.[0] || [];

  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD PRODUCT (EDIT MODE)
  ========================= */
  useEffect(() => {
    if (isEdit && productId) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`/api/products/${productId}`);
          setProduct({
            product_id: res.data.product_id,
            title: res.data.title,
            price: res.data.price,
            description: res.data.description,
            content: res.data.content,
            category: res.data.category,
          });
          setImages(res.data.images);
        } catch (err) {
          alert("Failed to load product");
        }
      };
      fetchProduct();
    }
  }, [isEdit, productId]);

  /* =========================
        INPUT HANDLER
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  /* =========================
        IMAGE UPLOAD
  ========================= */
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) return alert("Image size should be under 1MB");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.msg || "Image upload failed");
    }
  };

  /* =========================
        SUBMIT FORM
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!images) return alert("Please upload product image");

    try {
      setLoading(true);

      if (isEdit) {
        await axios.put(
          `/api/products/${productId}`,
          { ...product, images },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        alert("Product updated successfully");
      } else {
        await axios.post(
          "/api/products",
          { ...product, images },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        alert("Product created successfully");
        setProduct(initialState);
        setImages(null);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? "Edit Product" : "Create Product"}</h2>

      <div className="product-form-grid">
        <div>
          <label>Product ID</label>
          <input
            name="product_id"
            value={product.product_id}
            onChange={handleChange}
            disabled={isEdit}
          />
        </div>

        <div>
          <label>Title</label>
          <input
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        <div className="full-width">
          <label>Content</label>
          <textarea
            name="content"
            value={product.content}
            onChange={handleChange}
          />
        </div>

        <div className="full-width">
          <label>Product Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleUpload}
          />

          {loading && <p>Uploading...</p>}

          {images && (
            <img
              src={images.url}
              alt="product"
              className="product-image-preview"
            />
          )}
        </div>
      </div>

      <div className="product-form-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>

        <button type="submit" className="btn-primary" disabled={loading}>
          {isEdit ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
