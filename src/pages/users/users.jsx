import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetUsers, DeleteUser } from '../../../features/users/usersThunk';
import UsersTable from '../../components/UsersTable';
import Pagination from '../../components/Pagination';
import { FaPlus } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
`;

const NewUserButton = styled.button`
  background-color: #135846;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #0a3c29;
  }

  & > svg {
    margin-right: 0.5rem;
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
  .filter((user) => filter === 'all' || user.state === filter.toUpperCase())
  .filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.work.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.telephone.includes(searchTerm)
  )
  .sort((a, b) => {
    const key = sortConfig.key;
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    return a[key] > b[key] ? direction : a[key] < b[key] ? -direction : 0;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleRowClick = (id) => {
    navigate(`/users/${id}`);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(DeleteUser(userId)).then(() => {
        dispatch(GetUsers());
      });
    }
  };
  const handleCreate = () => {
    navigate('/users/new');
  };
  const handleEdit = (user) => {
    navigate(`/users/edit/${user.id}`);
  };
  return (
    <Container>
      <Header>
        <NewUserButton onClick={handleCreate}>
          <FaPlus /> Add User
        </NewUserButton>
      </Header>
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
      <UsersTable
        users={currentUsers}
        handleRowClick={handleRowClick}
        handleSort={handleSort}
        sortConfig={sortConfig}
        onDelete={handleDelete}
        onEdit={handleEdit} 
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default Users;
