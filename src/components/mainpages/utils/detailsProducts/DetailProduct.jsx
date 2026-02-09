import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GlobalState from "../../../../GlobalState";
import "./DetailProduct.css";

function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useContext(GlobalState);

  const [products] = state.productAPI.products;
  const addCart = state.userAPI.addCart; // ✅ IMPORTANT

  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    if (id && products.length > 0) {
      const found = products.find((p) => p._id === id);
      setDetailProduct(found);
    }
  }, [id, products]);

  if (!detailProduct) return <h2>Loading...</h2>;

  return (
    <div className="detail">
      <img src={detailProduct.images.url} alt={detailProduct.title} />

      <div className="box_detail">
        <div className="row">
          <h2>{detailProduct.title}</h2>
          <h6>{detailProduct.product_id}</h6>
        </div>

        <span>₹{detailProduct.price}</span>
        <p>{detailProduct.description}</p>
        <p>{detailProduct.content}</p>
        <p>Sold: {detailProduct.sold}</p>

        {/* 🔥 BUY NOW */}
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
