import { useContext } from "react";
import ProductForm from "../admin/productForm/ProductForm";
import GlobalState from "../../../GlobalState";
import { useParams } from "react-router-dom";
import authApi from "../../../api/authApi";

function CreateProduct() {
  const { id } = useParams();
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [token] = state.token;

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    await authApi.post(`/api/products`, data, {
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
