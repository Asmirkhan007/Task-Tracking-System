import React, { useState } from "react";
import "./Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange, tableKey }) {
  const [localPage, setLocalPage] = useState(
    parseInt(localStorage.getItem(`${tableKey}CurrentPage`)) || currentPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setLocalPage(pageNumber);
      onPageChange(pageNumber);
      localStorage.setItem(`${tableKey}CurrentPage`, pageNumber);
    }
  };
    const handlePreviousPage = () => {
      handlePageChange(localPage - 1);
    };

    const handleNextPage = () => {
      handlePageChange(localPage + 1);
    };


  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      pageNumbers.push(pageNumber);
    }

    return pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`pagination-button ${
          pageNumber === currentPage ? "active" : ""
        }`}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div className="pagination">
      <button onClick={handlePreviousPage} disabled={localPage === 1}>
        Previous
      </button>
      <div className="page-numbers">{renderPageNumbers()}</div>
      <button onClick={handleNextPage} disabled={localPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
