import { styled } from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const PageButton = styled.button<{ $isActive: boolean }>`
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;