// Create a new file named SearchBar.js
// This file will contain your search bar component

import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // Pass the search term to the parent component
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search properties..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
