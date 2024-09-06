export interface Amenity {
    name: string
    isFree: boolean
    description: string
}
export interface Booking {
    id: number
    name: string
    orderDate: string
    checkIn: string
    checkOut: string
    roomType: string
    status: 'Booked' | 'Pending' | 'Cancelled' | 'Refund'
    description: string
    price: string
    amenities: Amenity[]
    specialRequest?: string
}

export interface GuestTableProps {
    guest: Booking[]
    handleSort: (key: keyof Booking) => void
    onSpecialRequestClick: (description: string) => void
    onDeleteClick: (id: number) => void
    onEditClick: (id: number) => void
    onRowClick: (id: number) => void
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
  