import React, { useState } from "react";
import "./Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange, tableKey }) {
  // State to manage the local page, initialized with the current page from localStorage or the default currentPage
  const [localPage, setLocalPage] = useState(
    parseInt(localStorage.getItem(`${tableKey}CurrentPage`)) || currentPage
  );

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    // Check if the pageNumber is within the valid range (1 to totalPages)
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      // Update local state, trigger the onPageChange callback, and save to localStorage
      setLocalPage(pageNumber);
      onPageChange(pageNumber);
      localStorage.setItem(`${tableKey}CurrentPage`, pageNumber);
    }
  };

  // Function to handle clicking on the "Previous" button
  const handlePreviousPage = () => {
    // Call handlePageChange to go to the previous page
    handlePageChange(localPage - 1);
  };

  // Function to handle clicking on the "Next" button
  const handleNextPage = () => {
    // Call handlePageChange to go to the next page
    handlePageChange(localPage + 1);
  };

  // Function to render page numbers as buttons
  const renderPageNumbers = () => {
    const pageNumbers = [];
    // Generate an array of page numbers from 1 to totalPages
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      pageNumbers.push(pageNumber);
    }

    // Map through the page numbers and create a button for each
    return pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        // Apply the "active" class to the button if it represents the current page
        className={`pagination-button ${
          pageNumber === currentPage ? "active" : ""
        }`}
      >
        {pageNumber}
      </button>
    ));
  };

  // Render the Pagination component
  return (
    <div className="pagination">
      {/* Button for navigating to the previous page, disabled if already on the first page */}
      <button onClick={handlePreviousPage} disabled={localPage === 1}>
        Previous
      </button>
      {/* Container for rendering page numbers */}
      <div className="page-numbers">{renderPageNumbers()}</div>
      {/* Button for navigating to the next page, disabled if already on the last page */}
      <button onClick={handleNextPage} disabled={localPage === totalPages}>
        Next
      </button>
    </div>
  );
}

// Export the Pagination component as the default export
export default Pagination;
