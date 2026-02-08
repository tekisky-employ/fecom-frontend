// import React, { useContext, useState } from "react";
// import axios from "axios";
// import GlobalState from "../../../GlobalState";
// import "./CreateProduct.css";

// function CreateProduct() {
//   const state = useContext(GlobalState);
//   const [token] = state.token;
//   // const [categories] = state.categoriesAPI.categories;
//   const categoriesAPI = state?.categoriesAPI;
//   const categories = categoriesAPI?.categories?.[0] || [];

//   const [product, setProduct] = useState({
//     product_id: "",
//     title: "",
//     price: "",
//     description: "",
//     content: "",
//     category: "",
//   });

//   const [images, setImages] = useState(null);

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };
//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return alert("No file selected");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await axios.post("/api/upload", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setImages(res.data);
//     } catch (err) {
//       alert(err.response?.data?.msg || "Image upload failed");
//     }
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!images) {
//       alert("Please upload image first");
//       return;
//     }

//     try {
//       await axios.post(
//         "/api/products",
//         { ...product, images },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       alert("Product Created");
//     } catch (error) {
//       alert(error.response?.data?.msg || "Product create failed");
//     }
//   };

//   return (
//     <div className="create-product">
//       <h2>Create Product</h2>

//       <form onSubmit={submitHandler}>
//         <input
//           name="product_id"
//           placeholder="Product ID"
//           onChange={handleChange}
//         />
//         <input name="title" placeholder="Title" onChange={handleChange} />
//         <input
//           name="price"
//           placeholder="Price"
//           type="number"
//           onChange={handleChange}
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           onChange={handleChange}
//         />
//         <textarea
//           name="content"
//           placeholder="Content"
//           onChange={handleChange}
//         />

//         <select name="category" onChange={handleChange}>
//           <option value="">Select Category</option>
//           {categories.map((c) => (
//             // <option value={c.name} key={c._id}>
//             //   {c.name}
//             // </option>
//             <option value={c._id}>{c.name}</option>
//           ))}
//         </select>

//         <input
//           type="file"
//           accept="image/png, image/jpeg, image/webp"
//           onChange={handleUpload}
//         />

//         {images && <img src={images.url} alt="preview" width="150" />}

//         <button type="submit">Create Product</button>
//       </form>
//     </div>
//   );
// }

// export default CreateProduct;

import axios from "axios";
import { useContext } from "react";
import ProductForm from "../admin/productForm/ProductForm";
import GlobalState from "../../../GlobalState";
import { useParams } from "react-router-dom";

function CreateProduct() {
  const { id } = useParams();
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [token] = state.token;

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    await axios.post("/api/products", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Product created");
  };

  return (
    <ProductForm
      onSubmit={handleSubmit}
      categories={categories}
      product={{ product_id: "", title: "", price: "", category: "" }}
      isEdit={!!id}
      productId={id}
    />
  );
}

export default CreateProduct;
