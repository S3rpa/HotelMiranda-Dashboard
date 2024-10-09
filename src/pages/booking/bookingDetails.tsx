import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Booking, GuestTableProps } from '../../interfaces/bookingInterfaces';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  ActionIcons,
  NoResults,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalFooter,
  CloseButtonFooter,
} from '../../components/guestTableStyles';

const GuestTable: React.FC<GuestTableProps> = ({
  guest,
  handleSort,
  onSpecialRequestClick,
  onDeleteClick,
  onEditClick,
}) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>('');

  const handleRowClick = (id: string) => {
    navigate(`/bookings/${id}`);
  };

  const handleSpecialRequestClick = (description?: string) => {
    if (description) {
      setModalContent(description);
      setModalOpen(true);
    } else {
      setModalContent('No special request available');
      setModalOpen(true);
    }
  };

  return (
    <>
      {modalOpen && (
        <ModalOverlay onClick={() => setModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Special Request</ModalTitle>
              <CloseButton onClick={() => setModalOpen(false)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>{modalContent}</ModalBody>
            <ModalFooter>
              <CloseButtonFooter onClick={() => setModalOpen(false)}>Close</CloseButtonFooter>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
      {guest.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader onClick={() => handleSort('user')}>Guest</TableHeader>
              <TableHeader onClick={() => handleSort('orderDate')}>Order Date</TableHeader>
              <TableHeader onClick={() => handleSort('checkIn')}>Check In</TableHeader>
              <TableHeader onClick={() => handleSort('checkOut')}>Check Out</TableHeader>
              <TableHeader>Special Request</TableHeader>
              <TableHeader onClick={() => handleSort('room')}>Room Type</TableHeader>
              <TableHeader onClick={() => handleSort('status')}>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {guest.map((booking: Booking) => (
              <TableRow key={booking._id} onClick={() => handleRowClick(booking._id)}>
                <TableCell>
                  {booking.user.name || 'Unknown User'} 
                  <br />
                  <small>{`#${booking._id}`}</small>
                </TableCell>
                <TableCell>{new Date(booking.orderDate).toLocaleString()}</TableCell>
                <TableCell>{new Date(booking.checkIn).toLocaleString()}</TableCell>
                <TableCell>{new Date(booking.checkOut).toLocaleString()}</TableCell>
                <TableCell>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpecialRequestClick(booking.specialRequest);
                    }}
                  >
                    {booking.specialRequest ? 'View Notes' : 'No Notes'}
                  </button>
                </TableCell>
                <TableCell>{booking.room || 'N/A'}</TableCell>
                <TableCell
                  style={{
                    color:
                      booking.status === 'Booked'
                        ? 'green'
                        : booking.status === 'Cancelled'
                        ? 'red'
                        : booking.status === 'Pending'
                        ? 'orange'
                        : 'grey',
                  }}
                >
                  {booking.status}
                </TableCell>
                <TableCell>
                  <ActionIcons>
                    <FaTrashAlt
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteClick(booking._id);
                      }}
                    />
                    <FaEdit
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditClick(booking._id);
                      }}
                    />
                  </ActionIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <NoResults>No search results found</NoResults>
      )}
    </>
  );
};

export default GuestTable;