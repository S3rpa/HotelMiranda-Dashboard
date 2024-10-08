import { styled } from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  background-color: #f7f7f7;
  color: #333;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
`;

export const NewRoomButton = styled.button`
  background-color: #135846;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #0a3c29;
  }

  & > svg {
    margin-right: 0.5rem;
  }
`;

export const Tabs = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const Tab = styled.button<{ $active: boolean }>`
  background-color: ${(props) => (props.$active ? '#135846' : 'transparent')};
  color: ${(props) => (props.$active ? 'white' : '#333')};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;

  &:hover {
    background-color: #0a3c29;
    color: white;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f5f5f5;
  color: black;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: rgba(0, 0, 0, 0.09);
    cursor: pointer;
  }
`;

export const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #eaeaea;
  }
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 1rem;
`;

export const StatusBadge = styled.span<{ $state: 'Available' | 'Booked' | 'Under Maintenance' }>`
  color: ${(props) =>
    props.$state === 'Available'
      ? 'green'
      : props.$state === 'Booked'
      ? 'red'
      : 'orange'};
`;

export const ActionsCell = styled.div`
  display: flex;
  gap: 10px;
`;