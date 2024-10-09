export interface Amenity {
    name: string
    isFree: boolean
    description: string
}
export interface Booking {
  _id: string;
  id: string;
  user: string;
  room: string;
  orderDate: string;
  checkIn: string;
  checkOut: string;
  status: 'Booked' | 'Pending' | 'Cancelled' | 'Refund';
  price: number;
  specialRequest?: string;
}

export interface GuestTableProps {
  guest: Booking[];
  handleSort: (key: keyof Booking) => void;
  onSpecialRequestClick: (request: string) => void;
  onDeleteClick: (id: string) => void; 
  onEditClick: (id: string) => void; 
  onRowClick: (id: string) => void;
}

  export interface BookingsState {
    data: Booking[]
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
    error: string | null
  }

  export interface SortConfig {
    key: keyof Booking;
    direction: 'asc' | 'desc';
  }
  