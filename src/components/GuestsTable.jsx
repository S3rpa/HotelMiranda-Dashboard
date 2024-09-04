import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrashAlt, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
  color: black;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: rgba(0, 0, 0, 0.09);
    cursor: pointer;
  }
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #eaeaea;
  }
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 1rem;
`;

const ActionIcons = styled.div`
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

const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: #888;
`;

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background-color: white;
  color: black;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  margin-bottom: 1rem;
  line-height: 1.5;
  text-align: center;
  color: #333;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;

const CloseButtonFooter = styled.button`
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

const GuestTable = ({ guests, handleSort, onSpecialRequestClick, onDeleteClick, onEditClick }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleRowClick = (id) => {
    navigate(`/bookings/${id}`);
  };

  const handleSpecialRequestClick = (description) => {
    setModalContent(description);
    setModalOpen(true);
  };

  return (
    <>
      {modalOpen && (
        <ModalOverlay onClick={() => setModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Special Request</ModalTitle>
              <CloseButton onClick={() => setModalOpen(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>{modalContent}</ModalBody>
            <ModalFooter>
              <CloseButtonFooter onClick={() => setModalOpen(false)}>Close</CloseButtonFooter>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
      {guests.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader onClick={() => handleSort('name')}>Guest</TableHeader>
              <TableHeader onClick={() => handleSort('orderDate')}>Order Date</TableHeader>
              <TableHeader onClick={() => handleSort('checkIn')}>Check In</TableHeader>
              <TableHeader onClick={() => handleSort('checkOut')}>Check Out</TableHeader>
              <TableHeader>Special Request</TableHeader>
              <TableHeader onClick={() => handleSort('roomType')}>Room Type</TableHeader>
              <TableHeader onClick={() => handleSort('status')}>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {guests.map((guest) => (
              <TableRow key={guest.id} onClick={() => handleRowClick(guest.id)}>
                <TableCell>
                  {guest.name}
                  <br />
                  <small>{`#${guest.id}`}</small>
                </TableCell>
                <TableCell>{new Date(guest.orderDate).toLocaleString()}</TableCell>
                <TableCell>{new Date(guest.checkIn).toLocaleString()}</TableCell>
                <TableCell>{new Date(guest.checkOut).toLocaleString()}</TableCell>
                <TableCell>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpecialRequestClick(guest.specialRequest || guest.description);
                    }}
                  >
                    View Notes
                  </button>
                </TableCell>
                <TableCell>{guest.roomType}</TableCell>
                <TableCell
                  style={{
                    color:
                      guest.status === 'Booked'
                        ? 'green'
                        : guest.status === 'Cancelled'
                        ? 'red'
                        : guest.status === 'Pending'
                        ? 'orange'
                        : 'white',
                  }}
                >
                  {guest.status}
                </TableCell>
                <TableCell>
                  <ActionIcons>
                    <FaTrashAlt
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteClick(guest.id);
                      }}
                    />
                    <FaEllipsisV
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditClick(guest.id);
                      }}
                    />
                  </ActionIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <NoResults>No search results found</NoResults>
      )}
    </>
  );
};

export default GuestTable;
