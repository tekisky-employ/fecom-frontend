import React, { useContext, useState } from "react";
import axios from "axios";
import "./Categories.css";
import GlobalState from "../../../../GlobalState";

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
        await axios.put(
          `/api/category/${id}`,
          { name, image },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        alert("Category Updated ✅");
      } else {
        await axios.post(
          "/api/category",
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

    await axios.delete(`/api/category/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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

// import React, { useContext, useState } from "react";
// import axios from "axios";
// import "./Categories.css";
// import GlobalState from "../../../../GlobalState";

// function Category() {
//   const state = useContext(GlobalState);
//   // const [categories, setCategories] = state.categoriesAPI.categories;
//   const categoriesAPI = state.categoriesAPI;
//   const categories = categoriesAPI?.categories?.[0] || [];
//   const setCategories = categoriesAPI?.categories?.[1];
//   const [token] = state.token;

//   const [name, setName] = useState("");
//   const [image, setImage] = useState("");
//   const [onEdit, setOnEdit] = useState(false);
//   const [id, setId] = useState("");

//   const createCategory = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "/api/category",
//         { name, image },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       await categoriesAPI.getCategories(); // ✅ real data reload

//       setName("");
//       alert("Category Created");
//     } catch (err) {
//       alert(err.response?.data?.msg || "Error");
//       console.log(err);
//     }
//   };

//   const deleteCategory = async (id) => {
//     if (!window.confirm("Delete this category?")) return;

//     await axios.delete(`/api/category/${id}`, {
//       headers: { Authorization: token },
//     });

//     setCategories(categories.filter((c) => c._id !== id));
//   };

//   const editCategory = (cat) => {
//     setId(cat._id);
//     setName(cat.name);
//     setImage(cat.image);
//     setOnEdit(true);
//   };

//   return (
//     <div className="category">
//       <h2>Categories</h2>

//       <form onSubmit={createCategory}>
//         <input
//           type="text"
//           placeholder="Category name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Image URL"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//           required
//         />
//         <button type="submit">Create</button>
//       </form>

//       <div className="category-list">
//         {Array.isArray(categories) &&
//           categories.map((cat) => (
//             <div className="category-row" key={cat._id}>
//               <span>{cat.name}</span>
//               <button onClick={() => deleteCategory(cat._id)}>❌</button>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default Category;
