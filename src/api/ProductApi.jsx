// import React, { useEffect, useState } from "react";
// import axios from "axios";
// function ProductApi() {
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState("");
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("");
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const getProducts = async () => {
//       const res = await axios.get(
//         `/api/products?category=${category}&search=${search}&sort=${sort}&page=${page}`,
//       );
//       setProducts(res.data.data);
//       setTotal(res.data.total);
//     };

//     getProducts();
//   }, [category, search, sort, page]);

//   return {
//     products: [products, setProducts],
//     category: [category, setCategory],
//     search: [search, setSearch],
//     sort: [sort, setSort],
//     page: [page, setPage],
//     total: [total, setTotal],
//   };
// }

// export default ProductApi;

import React, { useEffect, useState } from "react";
import axios from "axios";
function ProductApi() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/api/products?category=${category}&search=${search}&sort=${sort}&page=${page}`,
      );
      setProducts(res.data.data);
      setTotal(res.data.total);
    };

    getProducts();
  }, [category, search, sort, page]);

  return {
    products: [products, setProducts],
    category: [category, setCategory],
    search: [search, setSearch],
    sort: [sort, setSort],
    page: [page, setPage],
    total: [total, setTotal],
  };
}

export default ProductApi;
  
