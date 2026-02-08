import { useState, useEffect } from "react";
import axios from "axios";

function CategoriesAPI() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to load categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    categories: [categories, setCategories],
    getCategories,
  };
}

export default CategoriesAPI;
