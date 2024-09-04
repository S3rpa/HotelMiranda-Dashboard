import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetBookings, DeleteBooking } from '../../../features/bookings/bookingThunk';
import GuestTable from '../../components/GuestsTable';
import Pagination from '../../components/Pagination';
import { FaEllipsisV, FaTrashAlt } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 1rem;
`;

const NewBookingButton = styled.button`
  background-color: #135846;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0a3c29;
  }
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Tab = styled.button`
  background-color: ${(props) => (props.$active ? '#135846' : 'transparent')};
  color: ${(props) => (props.$active ? 'white' : '#333')};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;

  &:hover {
    background-color: #0a3c29;
    color: white;
  }
`;

const SpecialRequestPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 400px;
  max-width: 90%;
  color: #333;
  text-align: left;

  h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #135846;
  }

  p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const Booking = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'orderDate', direction: 'desc' });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.data);
  const bookingsStatus = useSelector((state) => state.bookings.status);

  const guestsPerPage = 10;

  useEffect(() => {
    if (bookingsStatus === 'idle') {
        dispatch(GetBookings());
    }
  }, [dispatch, bookingsStatus]);

  const filteredGuests = Array.isArray(bookings)
    ? bookings
      .filter((guest) => {
        if (filter === 'pending') {
          return guest.status.toLowerCase() === 'pending';
        }
        if (filter === 'booked') {
          return guest.status.toLowerCase() === 'booked';
        }
        if (filter === 'cancelled') {
          return guest.status.toLowerCase() === 'cancelled';
        }
        if (filter === 'refund') {
          return guest.status.toLowerCase() === 'refund';
        }
        return true;
      })
      .filter((guest) => {
        return guest.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  const sortedGuests = filteredGuests.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const paginatedGuests = sortedGuests.slice(
    (currentPage - 1) * guestsPerPage,
    currentPage * guestsPerPage
  );

  const totalPages = Math.ceil(sortedGuests.length / guestsPerPage);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSpecialRequestClick = (request) => {
    setSelectedRequest(request);
  };

  const handleDelete = (guestId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      dispatch(DeleteBooking(guestId)).then(() => {
        dispatch(GetBookings());
      });
    }
  };

  const handleEditClick = (guestId) => {
    navigate(`/bookings/update/${guestId}`);
  };

  const closePopup = () => {
    setSelectedRequest(null);
  };

  return (
    <Container>
      <Header>
        <SearchInput
          type="text"
          placeholder="Search by guest name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <NewBookingButton onClick={() => navigate('/bookings/new')}>
          New Booking
        </NewBookingButton>
      </Header>
      <Tabs>
        <Tab $active={filter === 'all'} onClick={() => setFilter('all')}>
          All Guests
        </Tab>
        <Tab $active={filter === 'pending'} onClick={() => setFilter('pending')}>
          Pending
        </Tab>
        <Tab $active={filter === 'booked'} onClick={() => setFilter('booked')}>
          Booked
        </Tab>
        <Tab $active={filter === 'cancelled'} onClick={() => setFilter('cancelled')}>
          Cancelled
        </Tab>
        <Tab $active={filter === 'refund'} onClick={() => setFilter('refund')}>
          Refund
        </Tab>
      </Tabs>
      <GuestTable
        guests={paginatedGuests}
        handleSort={handleSort}
        onSpecialRequestClick={handleSpecialRequestClick}
        onDeleteClick={handleDelete}
        onEditClick={handleEditClick}
        onRowClick={(guestId) => navigate(`/bookings/${guestId}`)}
      />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange} 
      />
      {selectedRequest && (
        <>
          <Overlay onClick={closePopup} />
          <SpecialRequestPopup onClick={(e) => e.stopPropagation()}>
            <h2>View Notes</h2>
            <p>{selectedRequest}</p>
          </SpecialRequestPopup>
        </>
      )}
    </Container>
  );
};

export default Booking;
