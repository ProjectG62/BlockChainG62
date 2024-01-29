import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleClearClick = () => {
    setSearchTerm("");
    // Redirect to "Buy Property" page immediately when the "x" button is clicked
    navigate("/Buy_Property");
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="property/price/country..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          style={{ fontSize: "18px" }}
        />
        <button
          className="search-button"
          onClick={searchTerm ? handleClearClick : handleSearchClick}
        >
          {searchTerm ? <FaTimes /> : <FaSearch />}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
