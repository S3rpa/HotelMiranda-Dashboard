import React from 'react'
import { Room, RoomsTableProps } from '../../src/interfaces/roomInterfaces'
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  ActionsCell,
  StatusBadge,
} from '../../src/styles/room/roomsStyles'

const RoomsTable: React.FC<RoomsTableProps> = ({ rooms, handleRowClick, handleSort, onDelete, sortConfig }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader onClick={() => handleSort('room_name')}>Room Name</TableHeader>
                    <TableHeader onClick={() => handleSort('amenities')}>Amenities</TableHeader>
                    <TableHeader onClick={() => handleSort('price')}>Price</TableHeader>
                    <TableHeader onClick={() => handleSort('offer')}>Offer</TableHeader>
                    <TableHeader onClick={() => handleSort('status')}>Status</TableHeader>
                    <TableHeader>Actions</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {rooms.map(room => (
                    <TableRow key={room._id}>
                        <TableCell onClick={() => handleRowClick(room._id)}>{room.room_name}</TableCell>
                        <TableCell>
                            {Array.isArray(room.amenities)
                                ? room.amenities.join(', ')
                                : room.amenities}
                        </TableCell>
                        <TableCell>{room.price}</TableCell>
                        <TableCell>{room.offer}</TableCell>
                        <TableCell>
                            <StatusBadge $state={room.status}>{room.status}</StatusBadge>
                        </TableCell>
                        <TableCell>
                            <ActionsCell>
                                <button onClick={() => onDelete(room._id)}>Delete</button>
                            </ActionsCell>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default RoomsTable