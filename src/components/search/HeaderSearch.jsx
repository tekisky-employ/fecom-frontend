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
