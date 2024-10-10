import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetBookings, DeleteBooking } from '../../../features/bookings/bookingThunk';
import GuestTable from '../../components/GuestsTable';
import Pagination from '../../components/Pagination';
import {
  Container,
  Header,
  SearchInput,
  NewBookingButton,
  Tabs,
  Tab,
  SpecialRequestPopup,
  Overlay,
} from '../../styles/booking/bookingStyles';
import type { Booking, SortConfig, BookingsState } from '../../interfaces/bookingInterfaces';
import { RootState, AppDispatch } from '../../../app/store';

const Booking: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'orderDate',
    direction: 'desc',
  });
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const navigate = useNavigate();

  const bookings = useSelector((state: RootState) => state.bookings.data) as Booking[];
  const bookingsStatus = useSelector((state: RootState) => state.bookings.status) as BookingsState['status'];

  const guestsPerPage = 10;

  useEffect(() => {
    if (bookingsStatus === 'idle') {
      dispatch(GetBookings());
    }
  }, [dispatch, bookingsStatus]);

  const filteredGuests = bookings.filter((guest) => {
    if (!guest.status) return false;
    if (filter === 'pending') return guest.status === 'Pending';
    if (filter === 'booked') return guest.status === 'Booked';
    if (filter === 'cancelled') return guest.status === 'Cancelled';
    if (filter === 'refund') return guest.status === 'Refund';
    return true;
  });

  const sortedGuests = filteredGuests.sort((a, b) => {
    const key = sortConfig.key;
    const direction = sortConfig.direction;
    
    if (a[key] !== undefined && b[key] !== undefined) {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const paginatedGuests = sortedGuests.slice((currentPage - 1) * guestsPerPage, currentPage * guestsPerPage);
  const totalPages = Math.ceil(sortedGuests.length / guestsPerPage);

  const handleSort = (key: keyof Booking) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSpecialRequestClick = (request: string) => {
    setSelectedRequest(request);
  };

  const handleDelete = (guestId: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      dispatch(DeleteBooking(guestId)).then(() => {
        dispatch(GetBookings());
      });
    }
  };

  const handleEditClick = (guestId: string) => {
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
        guest={paginatedGuests}
        handleSort={handleSort}
        onSpecialRequestClick={handleSpecialRequestClick}
        onDeleteClick={handleDelete}
        onEditClick={handleEditClick}
        onRowClick={(guestId: string) => navigate(`/bookings/${guestId}`)}
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