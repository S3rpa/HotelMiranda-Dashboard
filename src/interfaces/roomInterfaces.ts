export interface Room {
    id: number;
    room_name: string;
    amenities: string;
    price: string;
    offer: string;
    status: 'Available' | 'Booked' | 'Under Maintenance';
  }
  
  export interface RoomState {
    data: Room[];
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | null;
  }
  
  export interface RoomsTableProps {
    rooms: Room[];
    handleRowClick: (id: number) => void;
    handleSort: (key: keyof Room) => void;
    onDelete: (roomId: number) => void;
    sortConfig: {
      key: keyof Room;
      direction: 'asc' | 'desc';
    };
  }