import React from "react";
import "./Pages.css"; // Import the corresponding CSS file

const Pages = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button
          className="next-prev"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          className="next-prev"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pages;
