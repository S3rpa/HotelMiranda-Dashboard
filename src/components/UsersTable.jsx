import React from 'react';
import styled from 'styled-components';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

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
  color: ${(props) => (props.$state === 'ACTIVE' ? 'green' : 'red')};
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

const ActionsCell = styled.div`
  display: flex;
  gap: 10px;
`;

const UsersTable = ({ users = [], handleRowClick, handleSort, sortConfig, onDelete, onEdit }) => {
    return (
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
                {users.length > 0 ? (
                    users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell onClick={() => handleRowClick(user.id)}>
                                <AvatarPlaceholder>
                                    {user.photo && user.photo.length > 0 ? (
                                        <AvatarImage
                                            src={user.photo[Math.floor(Math.random() * user.photo.length)]}
                                            alt={`${user.name} profile`}
                                        />
                                    ) : (
                                        <span>{user.name[0]}</span>
                                    )}
                                </AvatarPlaceholder>
                            </TableCell>
                            <TableCell onClick={() => handleRowClick(user.id)}>
                                <UserRow>
                                    <UserInfo>
                                        <UserName>{user.name}</UserName>
                                        <UserDetails>
                                            #{user.id} - Joined on {new Date(user.start_date).toDateString()}
                                        </UserDetails>
                                    </UserInfo>
                                </UserRow>
                            </TableCell>
                            <TableCell onClick={() => handleRowClick(user.id)}>{user.work}</TableCell>
                            <TableCell onClick={() => handleRowClick(user.id)}>{user.schedule || 'Monday, Friday'}</TableCell>
                            <TableCell onClick={() => handleRowClick(user.id)}>
                                <a href={`tel:${user.telephone}`}>{user.telephone}</a>
                            </TableCell>
                            <TableCell onClick={() => handleRowClick(user.id)}>
                                <StatusBadge $state={user.state}>{user.state}</StatusBadge>
                            </TableCell>
                            <TableCell>
                                <ActionsCell>
                                    <FaEdit onClick={() => {
                                        onEdit(user);
                                    }} />
                                    <FaTrashAlt onClick={() => onDelete(user.id)} />
                                </ActionsCell>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan="7">No users found</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default UsersTable;
