import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTrashAlt, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetBookings, DeleteBooking } from '../../features/bookings/bookingThunk';
import NewBooking from '/src/pages/booking/NewBooking.jsx';  // Verifica que esta ruta sea correcta

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

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  background-color: ${props => (props.$active ? '#333' : '#fff')};
  color: ${props => (props.$active ? '#fff' : '#333')};
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
`;

const AddButton = styled(Button)`
  background-color: #28a745;
  color: white;
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

    useEffect(() => {
        if (bookingsStatus === 'idle') {
            dispatch(GetBookings());
        }
    }, [dispatch, bookingsStatus]);

    const handleRowClick = (id) => {
        navigate(`/bookings/${id}`);
    };

    const handleUpdateClick = (id) => {
        navigate(`/bookings/update/${id}`);
    };

    const handleFilterChange = (newFilter) => {
        setFilterStatus(newFilter);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleSpecialRequestClick = (description) => {
        alert(description);
    };

    const handleDeleteClick = (id) => {
        dispatch(DeleteBooking(id));
    };

    const filteredBookings = bookings
        .filter(booking => {
            if (filterStatus !== 'ALL' && booking.status !== filterStatus) return false;
            const combinedString = JSON.stringify(booking).toLowerCase();
            return combinedString.includes(searchTerm);
        })
        .sort((a, b) => {
            const dateA = new Date(a.orderDate);
            const dateB = new Date(b.orderDate);
            return dateB - dateA;
        });

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
