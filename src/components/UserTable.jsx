import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTrashAlt, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetUsers, DeleteUser } from '../../features/users/usersThunk';

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
  color: black;

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

const UserTable = ({ users, handleSort, onDeleteClick }) => {
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/users/${id}`);
    };

    return (
        <>
            {users.length > 0 ? (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader onClick={() => handleSort('name')}>Name</TableHeader>
                            <TableHeader onClick={() => handleSort('work')}>Job Desk</TableHeader>
                            <TableHeader onClick={() => handleSort('schedule')}>Schedule</TableHeader>
                            <TableHeader onClick={() => handleSort('telephone')}>Contact</TableHeader>
                            <TableHeader onClick={() => handleSort('status')}>Status</TableHeader>
                            <TableHeader>Actions</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} onClick={() => handleRowClick(user.id)}>
                                <TableCell>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '5px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '20px',
                                                color: '#aaa',
                                                marginRight: '10px',
                                            }}
                                        >
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <strong>{user.name}</strong>
                                            <br />
                                            <small>#{user.id} - Joined on {new Date(user.start_date).toDateString()}</small>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{user.work}</TableCell>
                                <TableCell>{user.schedule || 'Monday, Friday'}</TableCell>
                                <TableCell>
                                    <a href={`tel:${user.telephone}`}>{user.telephone}</a>
                                </TableCell>
                                <TableCell
                                    style={{
                                        color: user.status === 'ACTIVE' ? 'green' : 'red',
                                    }}
                                >
                                    {user.status || 'INACTIVE'}
                                </TableCell>
                                <TableCell>
                                    <ActionIcons>
                                        <FaTrashAlt
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteClick(user.id);
                                            }}
                                        />
                                        <FaEllipsisV
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/users/edit/${user.id}`);
                                            }}
                                        />
                                    </ActionIcons>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <NoResults>No users found</NoResults>
            )}
        </>
    );
};

export default UserTable;
