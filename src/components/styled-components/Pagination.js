import React, { useState } from "react";
import './Pagination.css';
function Pagination({ currentPage, totalPages, onPageChange }) {
 const [localPage, setLocalPage] = useState(
   parseInt(localStorage.getItem("currentPage")) || currentPage
 );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setLocalPage(pageNumber);
      onPageChange(pageNumber);
      localStorage.setItem("currentPage", pageNumber);
    }
  };

  const handlePreviousPage = () => {
    handlePageChange(localPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(localPage + 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePreviousPage} disabled={localPage === 1}>
        Previous
      </button>
      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${
              index + 1 === localPage ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button onClick={handleNextPage} disabled={localPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
