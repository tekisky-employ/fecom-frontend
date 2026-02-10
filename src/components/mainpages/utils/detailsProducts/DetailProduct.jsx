import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GlobalState from "../../../../GlobalState";
import publicApi from "../../../../api/publicApi";
import "./DetailProduct.css";

function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;

  const [detailProduct, setDetailProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicApi.get(`/api/products/${id}`);
        setDetailProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!detailProduct) return <h2>Product not found</h2>;

  return (
    <div className="detail">
      <img
        src={detailProduct.images?.url || "/no-image.png"}
        alt={detailProduct.title}
      />

      <div className="box_detail">
        <div className="row">
          <h2>{detailProduct.title}</h2>
          <h6>{detailProduct.product_id}</h6>
        </div>

        <span>₹{detailProduct.price}</span>
        <p>{detailProduct.description}</p>
        <p>{detailProduct.content}</p>
        <p>Sold: {detailProduct.sold}</p>

        <button
          className="cart"
          onClick={() => {
            addCart(detailProduct);
            navigate("/cart");
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default DetailProduct;
