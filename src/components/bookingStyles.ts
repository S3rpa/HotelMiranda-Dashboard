import { styled } from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f5f5f5;
  color: black;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: rgba(0, 0, 0, 0.09);
    cursor: pointer;
  }
`;

export const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #eaeaea;
  }
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 1rem;
`;

export const ActionIcons = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1.2rem;
  color: white;

  & > * {
    cursor: pointer;
  }

  & > *:hover {
    color: #FF385C;
  }
`;

export const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: #888;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  color: black;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const ModalBody = styled.div`
  margin-bottom: 1rem;
  line-height: 1.5;
  text-align: center;
  color: #333;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;

export const CloseButtonFooter = styled.button`
  padding: 0.5rem 1rem;
  background-color: #FF385C;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e63950;
  }
`;
