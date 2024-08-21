import React from 'react';
import styled from 'styled-components';
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

const GuestTable = ({ guests, handleSort, onSpecialRequestClick }) => {
    const navigate = useNavigate();

    const handleRowClick = (guestId) => {
        navigate(`/bookings/${guestId}`);
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
                                    e.stopPropagation(); // Evitar la navegación al hacer clic en el botón
                                    onSpecialRequestClick(guest.specialRequest ? guest.specialRequest : guest.description);
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
                                                ? 'yellow'
                                                : 'black',
                            }}
                        >
                            {guest.status}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default GuestTable;
