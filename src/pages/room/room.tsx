import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetRooms, DeleteRoom } from '../../../features/rooms/roomThunk';
import RoomsTable from '../../components/RoomsTable';
import Pagination from '../../components/Pagination';
import { FaPlus } from 'react-icons/fa';
import { RootState, AppDispatch } from '../../../app/store';
import { Room } from '../../interfaces/roomInterfaces';
import { Container, Header, NewRoomButton, Tabs, Tab } from '../../styles/room/roomsStyles';

const Rooms: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Available' | 'Booked' | 'Under Maintenance'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 10;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const rooms = useSelector((state: RootState) => state.rooms.data);
  const roomsStatus = useSelector((state: RootState) => state.rooms.status);
  
  const [sortConfig, setSortConfig] = useState<{ key: keyof Room; direction: 'asc' | 'desc' }>({
    key: 'room_name',
    direction: 'asc',
  });

  useEffect(() => {
    if (roomsStatus === 'idle') {
      dispatch(GetRooms());
    }
  }, [dispatch, roomsStatus]);

  const filteredRooms = rooms
    .filter((room: Room) => filter === 'all' || room.status === filter)
    .sort((a: Room, b: Room) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      return a[key] > b[key] ? direction : a[key] < b[key] ? -direction : 0;
    });

  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);
  const currentRooms = filteredRooms.slice(
    (currentPage - 1) * roomsPerPage,
    currentPage * roomsPerPage
  );

  const handleRowClick = (id: number) => {
    navigate(`/rooms/${id}`);
  };

  const handleSort = (key: keyof Room) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (roomId: number) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      dispatch(DeleteRoom(roomId)).then(() => {
        dispatch(GetRooms());
      });
    }
  };

  const handleCreate = () => {
    navigate('/rooms/new');
  };

  return (
    <Container>
      <Header>
        <NewRoomButton onClick={handleCreate}>
          <FaPlus /> Add Room
        </NewRoomButton>
      </Header>
      <Tabs>
        <Tab $active={filter === 'all'} onClick={() => setFilter('all')}>
          All Rooms
        </Tab>
        <Tab $active={filter === 'Available'} onClick={() => setFilter('Available')}>
          Available Rooms
        </Tab>
        <Tab $active={filter === 'Booked'} onClick={() => setFilter('Booked')}>
          Booked Rooms
        </Tab>
        <Tab $active={filter === 'Under Maintenance'} onClick={() => setFilter('Under Maintenance')}>
          Under Maintenance
        </Tab>
      </Tabs>
      <RoomsTable
        rooms={currentRooms}
        handleRowClick={handleRowClick}
        handleSort={handleSort}
        sortConfig={sortConfig}
        onDelete={handleDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default Rooms;
