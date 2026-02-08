// import { useContext } from "react";
// import GlobalState from "../../GlobalState";
// import "./HeaderSearch.css";
// import { useNavigate } from "react-router-dom";

// function HeaderSearch() {
//   const state = useContext(GlobalState);
//   const [, setSearch] = state.productAPI.search;
//   const [, setPage] = state.productAPI.page;
//   const [, setCategory] = state.productAPI.category;
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();

//     // 🔥 category reset mat kar
//     navigate("/");
//   };

//   return (
//     <form onSubmit={handleSearch} className="search-box">
//       <input
//         type="text"
//         placeholder="Search products..."
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// }

// export default HeaderSearch;

import { useContext } from "react";
import GlobalState from "../../GlobalState";
import "./HeaderSearch.css";

function HeaderSearch() {
  const state = useContext(GlobalState);
  const [, setSearch] = state.productAPI.search;
  const [, setPage] = state.productAPI.page;

  return (
    <input
      className="header-search"
      type="text"
      placeholder="Search products..."
      onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}
    />
  );
}

export default HeaderSearch;
