import React from 'react';
import { Pagination } from 'react-bootstrap';

function CustomPagination(props) {
  const { currentPage, totalPages, onPageChange } = props;

  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pageButtons;
  };

  return (
    <Pagination>
      {currentPage > 1 ? (
        <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
      ) : (
        <Pagination.Prev disabled />
      )}
      {renderPageButtons()}
      {currentPage < totalPages ? (
        <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
      ) : (
        <Pagination.Next disabled />
      )}
    </Pagination>
  );
}

export default CustomPagination;
