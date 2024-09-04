import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetUsers } from '../../../features/users/usersThunk';
import { FaEllipsisV } from 'react-icons/fa';
import Pagination from '../../components/Pagination';

const Container = styled.div`
  padding: 2rem;
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

const StatusBadge = styled.span`
  color: ${(props) => (props.state === 'ACTIVE' ? 'green' : 'red')};
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const UserName = styled.span`
  font-weight: bold;
`;

const UserDetails = styled.small`
  color: #888;
`;

const AvatarPlaceholder = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f0f0f0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #aaa;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Users = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);
  const usersStatus = useSelector((state) => state.users.status);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(GetUsers());
    }
  }, [dispatch, usersStatus]);

  const filteredUsers = users
    .filter((user) => {
      if (filter === 'all') return true;
      return user.state === filter.toUpperCase();
    })
    .filter((user) => {
      return (
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.work.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.telephone.includes(searchTerm)
      );
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleRowClick = (id) => {
    navigate(`/users/${id}`);
  };

  if (usersStatus === 'loading') {
    return <div>Loading users...</div>;
  }

  if (usersStatus === 'failed') {
    return <div>Error loading users.</div>;
  }

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <Container>
      <Tabs>
        <Tab $active={filter === 'all'} onClick={() => setFilter('all')}>
          All Users
        </Tab>
        <Tab $active={filter === 'ACTIVE'} onClick={() => setFilter('ACTIVE')}>
          Active Users
        </Tab>
        <Tab $active={filter === 'INACTIVE'} onClick={() => setFilter('INACTIVE')}>
          Inactive Users
        </Tab>
      </Tabs>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader></TableHeader>
            <TableHeader onClick={() => handleSort('name')}>Name</TableHeader>
            <TableHeader onClick={() => handleSort('work')}>Job Desk</TableHeader>
            <TableHeader onClick={() => handleSort('schedule')}>Schedule</TableHeader>
            <TableHeader onClick={() => handleSort('telephone')}>Contact</TableHeader>
            <TableHeader onClick={() => handleSort('state')}>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow key={user.id} onClick={() => handleRowClick(user.id)}>
              <TableCell>
                <AvatarPlaceholder>
                  <AvatarImage
                    src={user.photo[Math.floor(Math.random() * user.photo.length)]}
                    alt={`${user.name} profile`}
                  />
                </AvatarPlaceholder>
              </TableCell>
              <TableCell>
                <UserRow>
                  <UserInfo>
                    <UserName>{user.name}</UserName>
                    <UserDetails>
                      #{user.id} - Joined on {new Date(user.start_date).toDateString()}
                    </UserDetails>
                  </UserInfo>
                </UserRow>
              </TableCell>
              <TableCell>{user.work}</TableCell>
              <TableCell>{user.schedule || 'Monday, Friday'}</TableCell>
              <TableCell>
                <a href={`tel:${user.telephone}`}>{user.telephone}</a>
              </TableCell>
              <TableCell>
                <StatusBadge state={user.state}>
                  {user.state}
                </StatusBadge>
              </TableCell>
              <TableCell>
                <FaEllipsisV />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default Users;
