import React from "react";
import "./SearchBar.scss";

const SearchBar = ({ query, onQueryChange, onSearchSubmit }) => {
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
        <div className="search-actions">
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
