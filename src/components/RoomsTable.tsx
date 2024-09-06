import React from 'react'
import { Room, RoomsTableProps } from '../../src/interfaces/roomInterfaces'

const RoomsTable: React.FC<RoomsTableProps> = ({ rooms, handleRowClick, handleSort, onDelete, sortConfig }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th onClick={() => handleSort('room_name')}>Room Name</th>
                    <th onClick={() => handleSort('amenities')}>Amenities</th>
                    <th onClick={() => handleSort('price')}>Price</th>
                    <th onClick={() => handleSort('offer')}>Offer</th>
                    <th onClick={() => handleSort('status')}>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rooms.map(room => (
                    <tr key={room.id}>
                        <td onClick={() => handleRowClick(room.id)}>{room.room_name}</td>
                        <td>{room.amenities}</td>
                        <td>{room.price}</td>
                        <td>{room.offer}</td>
                        <td>{room.status}</td>
                        <td>
                            <button onClick={() => onDelete(room.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default RoomsTable
