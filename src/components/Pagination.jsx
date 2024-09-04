import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.$isActive ? '#135846' : 'transparent')};
  color: ${(props) => (props.$isActive ? 'white' : '#333')};
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0a3c29;
    color: white;
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  
