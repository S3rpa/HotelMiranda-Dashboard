import React from 'react';
import styled from 'styled-components';
import { FaTrash, FaEllipsisV } from 'react-icons/fa';
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

const GuestTable = ({ guests, handleSort, onSpecialRequestClick, onDeleteClick }) => {
  const navigate = useNavigate();

  const handleUpdateClick = (id) => {
    navigate(`/bookings/update/${id}`);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader onClick={() => handleSort('name')}>Guest</TableHeader>
          <TableHeader onClick={() => handleSort('orderDate')}>Order Date</TableHeader>
          <TableHeader onClick={() => handleSort('checkIn')}>Check In</TableHeader>
          <TableHeader onClick={() => handleSort('checkOut')}>Check Out</TableHeader>
          <TableHeader>Special Request</TableHeader>
          <TableHeader>Room Type</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {guests.map((guest) => (
          <TableRow key={guest.id}>
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
                  onSpecialRequestClick(guest.specialRequest || guest.description);
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
                <FaTrash onClick={() => onDeleteClick(guest.id)} />
                <FaEllipsisV onClick={() => handleUpdateClick(guest.id)} />
              </ActionIcons>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GuestTable;
