import { useState, useEffect } from 'react';
import styled from 'styled-components';
import guestsData from '../../data/guest';
import GuestTable from '../../components/GuestsTable';

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #ffffff;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 1rem;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Tab = styled.button`
  background-color: ${(props) => (props.active ? '#135846' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : '#333')};
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PaginationButton = styled.button`
  background-color: #135846;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 0.5rem;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #0a3c29;
  }
`;

const Users = () => {
  const [guests, setGuests] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'orderDate', direction: 'desc' });

  const guestsPerPage = 10;

  useEffect(() => {
    setGuests(guestsData);
  }, []);

  const filteredGuests = Array.isArray(guests) ? guests.filter((guest) => {
    if (filter === 'pending') {
      return guest.status === 'Pending';
    }
    if (filter === 'booked') {
      return guest.status === 'Booked';
    }
    if (filter === 'cancelled') {
      return guest.status === 'Cancelled';
    }
    if (filter === 'refund') {
      return guest.status === 'Refund';
    }
    return true;
  }).filter((guest) => {
    return guest.name.toLowerCase().includes(searchTerm.toLowerCase());
  }) : [];

  const sortedGuests = filteredGuests.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const paginatedGuests = sortedGuests.slice((currentPage - 1) * guestsPerPage, currentPage * guestsPerPage);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next') {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === 'prev') {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Guest List</Title>
        <SearchInput
          type="text"
          placeholder="Search by guest name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Header>
      <Tabs>
        <Tab active={filter === 'all'} onClick={() => setFilter('all')}>All Guests</Tab>
        <Tab active={filter === 'pending'} onClick={() => setFilter('pending')}>Pending</Tab>
        <Tab active={filter === 'booked'} onClick={() => setFilter('booked')}>Booked</Tab>
        <Tab active={filter === 'cancelled'} onClick={() => setFilter('cancelled')}>Cancelled</Tab>
        <Tab active={filter === 'refund'} onClick={() => setFilter('refund')}>Refund</Tab>
      </Tabs>
      <GuestTable guests={paginatedGuests} handleSort={handleSort} />
      <Pagination>
        <PaginationButton
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
        >
          Prev
        </PaginationButton>
        <span>{currentPage}</span>
        <PaginationButton
          onClick={() => handlePageChange('next')}
          disabled={currentPage * guestsPerPage >= sortedGuests.length}
        >
          Next
        </PaginationButton>
      </Pagination>
    </Container>
  );
};

export default Users;
