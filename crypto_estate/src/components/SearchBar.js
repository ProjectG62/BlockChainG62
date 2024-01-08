// // Create a new file named SearchBar.js
// // This file will contain your search bar component

// import React, { useState } from "react";

// const SearchBar = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearch = () => {
//     // Pass the search term to the parent component
//     onSearch(searchTerm);
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       onSearch(searchTerm);
//     }
//   };

//   return (
//     <div className="search-bar">
//       <input
//         type="text"
//         placeholder="Search properties..."
//         value={searchTerm}
//         onChange={handleChange}
//         onKeyDown={handleKeyPress}
//       />
//       <button className="button" onClick={handleSearch}>
//         Search
//       </button>
//     </div>
//   );
// };

// export default SearchBar;
import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleClearClick = (event) => {
    setSearchTerm("");
    // onClear("/Buy_Property");
    <a href="/Buy_Property">Go to Buy Property</a>;
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="property/price/country..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button
        className="button"
        onClick={searchTerm ? handleClearClick : handleSearchClick}
      >
        {searchTerm ? <FaTimes /> : <FaSearch />}
      </button>
    </div>
  );
};

export default SearchBar;
