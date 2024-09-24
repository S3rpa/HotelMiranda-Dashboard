import React from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { User, UsersTableProps } from "../../src/interfaces/userInterfaces";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  StatusBadge,
  AvatarPlaceholder,
  AvatarImage,
  ActionsCell,
} from "../styles/users/userStyles";
import { useNavigate } from "react-router-dom";

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  handleRowClick,
  handleSort,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleEditClick = (id: number) => {
    navigate(`/users/edit/${id}`);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader></TableHeader>
          <TableHeader onClick={() => handleSort("name")}>Name</TableHeader>
          <TableHeader onClick={() => handleSort("work")}>Job Desk</TableHeader>
          <TableHeader onClick={() => handleSort("schedule")}>
            Schedule
          </TableHeader>
          <TableHeader onClick={() => handleSort("telephone")}>
            Contact
          </TableHeader>
          <TableHeader onClick={() => handleSort("state")}>Status</TableHeader>
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
                      src={
                        user.photo[
                          Math.floor(Math.random() * user.photo.length)
                        ]
                      }
                      alt={`${user.name} profile`}
                    />
                  ) : (
                    <span>{user.name[0]}</span>
                  )}
                </AvatarPlaceholder>
              </TableCell>
              <TableCell onClick={() => handleRowClick(user.id)}>
                <div>
                  <strong>{user.name}</strong>
                  <small>
                    {" "}
                    #{user.id} - Joined on{" "}
                    {new Date(user.start_date).toDateString()}
                  </small>
                </div>
              </TableCell>
              <TableCell onClick={() => handleRowClick(user.id)}>
                {user.work}
              </TableCell>
              <TableCell onClick={() => handleRowClick(user.id)}>
                {user.schedule || "Monday, Friday"}
              </TableCell>
              <TableCell onClick={() => handleRowClick(user.id)}>
                <a href={`tel:${user.telephone}`}>{user.telephone}</a>
              </TableCell>
              <TableCell onClick={() => handleRowClick(user.id)}>
                <StatusBadge $state={user.state}>{user.state}</StatusBadge>
              </TableCell>
              <TableCell>
                <ActionsCell>
                  <FaEdit onClick={() => handleEditClick(user.id)} />
                  <FaTrashAlt onClick={() => onDelete(user.id)} />
                </ActionsCell>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7}>No users found</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
