import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaEllipsisV, FaTrashAlt } from 'react-icons/fa';
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

const StatusBadge = styled.span`
  color: ${(props) => (props.$status === 'ACTIVE' ? 'green' : 'red')};
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
`;

const ActionIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.data);
    const usersStatus = useSelector((state) => state.users.status);

    useEffect(() => {
        if (usersStatus === 'idle') {
            dispatch(GetUsers());
        }
    }, [dispatch, usersStatus]);

    const handleRowClick = (id) => {
        navigate(`/users/${id}`);
    };

    const handleDeleteClick = (id, e) => {
        e.stopPropagation();
        dispatch(DeleteUser(id));
    };

    if (usersStatus === 'loading') {
        return <div>Loading users...</div>;
    }

    if (usersStatus === 'failed') {
        return <div>Error loading users.</div>;
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader>
                        <input type="checkbox" />
                    </TableHeader>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Job Desk</TableHeader>
                    <TableHeader>Schedule</TableHeader>
                    <TableHeader>Contact</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Actions</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id} onClick={() => handleRowClick(user.id)}>
                        <TableCell>
                            <input type="checkbox" />
                        </TableCell>
                        <TableCell>
                            <UserRow>
                                <AvatarPlaceholder>
                                    {user.name[0]}
                                </AvatarPlaceholder>
                                <UserInfo>
                                    <UserName>{user.name}</UserName>
                                    <UserDetails>#{user.id} - Joined on {new Date(user.start_date).toDateString()}</UserDetails>
                            </UserRow>
                        </TableCell>
                        <TableCell>{user.work}</TableCell>
                        <TableCell>{user.schedule || 'Monday, Friday'}</TableCell>
                        <TableCell>
                            <a href={`tel:${user.telephone}`}>{user.telephone}</a>
                        </TableCell>
                        <TableCell>
                            <StatusBadge $status={user.status || 'INACTIVE'}>
                                {user.status || 'INACTIVE'}
                            </StatusBadge>
                        </TableCell>
                        <TableCell>
                            <ActionIcons>
                                <FaEllipsisV color="white" />
                                <FaTrashAlt
                                    onClick={(e) => handleDeleteClick(user.id, e)}
                                    style={{ cursor: 'pointer', color: 'white' }}
                                />
                            </ActionIcons>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UserTable;
