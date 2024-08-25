import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTrashAlt, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetBookings, DeleteBooking } from '../../features/bookings/bookingThunk';
import NewBooking from '/src/pages/booking/NewBooking.jsx';

// Styled Components
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

// GuestTable Component
const GuestTable = () => {
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const bookings = useSelector((state) => state.bookings.data);
    const bookingsStatus = useSelector((state) => state.bookings.status);
    const bookingsError = useSelector((state) => state.bookings.error);

    useEffect(() => {
        if (bookingsStatus === 'idle') {
            dispatch(GetBookings());
        }
        console.log('Current bookings:', bookings);
    }, [dispatch, bookingsStatus, bookings]);

    const handleRowClick = (id) => {
        navigate(`/bookings/${id}`);
    };

    const handleUpdateClick = (id) => {
        navigate(`/bookings/update/${id}`);
    };

    const handleSpecialRequestClick = (description) => {
        alert(description);
    };

    const handleDeleteClick = (id) => {
        dispatch(DeleteBooking(id));
    };

    const filteredBookings = Array.isArray(bookings)
    ? bookings.filter(booking => {
        if (filterStatus !== 'ALL' && booking.status !== filterStatus) return false;
        const combinedString = JSON.stringify(booking).toLowerCase();
        return combinedString.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
        const dateA = new Date(a.orderDate);
        const dateB = new Date(b.orderDate);
        return dateB - dateA;
    })
    : [];

    if (bookingsStatus === 'loading') {
        return <div>Loading bookings...</div>;
    }
    
    if (bookingsStatus === 'failed') {
        return <div>Error loading bookings: {bookingsError}</div>;
    }
    
    if (!Array.isArray(bookings)) {
        return <div>No bookings available.</div>;
    }
    return (
        <>
            {filteredBookings.length > 0 ? (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Guest</TableHeader>
                            <TableHeader>Order Date</TableHeader>
                            <TableHeader>Check In</TableHeader>
                            <TableHeader>Check Out</TableHeader>
                            <TableHeader>Special Request</TableHeader>
                            <TableHeader>Room Type</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Actions</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredBookings.map((guest) => (
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
                                                handleDeleteClick(guest.id);
                                            }}
                                        />
                                        <FaEllipsisV
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpdateClick(guest.id);
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
