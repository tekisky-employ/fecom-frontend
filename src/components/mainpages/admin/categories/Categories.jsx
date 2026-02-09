import React, { useContext, useState } from "react";
import "./Categories.css";
import GlobalState from "../../../../GlobalState";
import authApi from "../../../../api/authApi";

function Category() {
  const state = useContext(GlobalState);
  const categoriesAPI = state.categoriesAPI;
  const categories = categoriesAPI?.categories?.[0] || [];
  const [token] = state.token;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState("");

  const submitCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        await authApi.put(
          `/api/category/${id}`,
          { name, image },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        alert("Category Updated ✅");
      } else {
        await authApi.post(
          `/api/category`,
          { name, image },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        alert("Category Created ✅");
      }

      setName("");
      setImage("");
      setId("");
      setOnEdit(false);
      categoriesAPI.getCategories();
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  const editCategory = (cat) => {
    setId(cat._id);
    setName(cat.name);
    setImage(cat.image);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    await authApi.delete(
      `/api/category/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    categoriesAPI.getCategories();
  };

  return (
    <div className="category-container">
      <h2>📦 Manage Categories</h2>

      <form className="category-form" onSubmit={submitCategory}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        {image && (
          <div className="preview">
            <img src={image} alt="preview" />
          </div>
        )}

        <button type="submit" className={onEdit ? "update" : "create"}>
          {onEdit ? "Update Category" : "Create Category"}
        </button>
      </form>

      <div className="category-grid">
        {categories.map((cat) => (
          <div className="category-card" key={cat._id}>
            <img src={cat.image} alt={cat.name} />
            <h4>{cat.name}</h4>

            <div className="actions">
              <button onClick={() => editCategory(cat)}>✏️ Edit</button>
              <button onClick={() => deleteCategory(cat._id)}>🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
