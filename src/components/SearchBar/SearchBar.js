import React from "react";
import "./SearchBar.scss";

const SearchBar = ({
  query,
  onQueryChange,
  onSearchSubmit,
  perPage,
  onPerPageChange,
}) => {
  return (
    <div className="search-bar">
      <form
        role="search"
        aria-label="Search for news"
        onSubmit={onSearchSubmit}
      >
        <input
          type="search"
          placeholder="Search news..."
          value={query}
          onChange={onQueryChange}
        />
        <button type="submit">Search</button>
        <select onChange={onPerPageChange} value={perPage}>
          <option value="6">6 per page</option>
          <option value="9">9 per page</option>
          <option value="12">12 per page</option>
        </select>
      </form>
    </div>
  );
};

export default SearchBar;
