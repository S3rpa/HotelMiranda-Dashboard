import { styled } from 'styled-components';

export const Container = styled.div`
  padding: 5%;
  background-color: #f7f7f7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #333;
  font-size: 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const NewRoomButton = styled.button`
  background-color: #135846;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #0f4b3d;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

export const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
`;

export const Tab = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  color: ${(props) => (props.$active ? '#135846' : '#333')};
  border-bottom: 2px solid ${(props) => (props.$active ? '#135846' : 'transparent')};

  &:hover {
    color: #135846;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const TableHead = styled.thead`
  background-color: #f1f1f1;
`;

export const TableRow = styled.tr``;

export const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
`;

export const StatusBadge = styled.span<{ $status: string }>`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: ${({ $status }) => 
    $status === 'Available' ? '#28a745' :
    $status === 'Booked' ? '#ffc107' : '#dc3545'};
  color: white;
`;

export const ActionsCell = styled.div`
  display: flex;
  justify-content: space-around;

  svg {
    cursor: pointer;
    font-size: 1.2rem;
    transition: color 0.3s ease;

    &:hover {
      color: #135846;
    }
  }
`;
