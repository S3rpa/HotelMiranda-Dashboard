import { styled } from 'styled-components';

export const DetailContainer = styled.div`
  padding: 2rem;
  background-color: #f7f7f7;
  display: flex;
  justify-content: space-between;
`;

export const RoomInfo = styled.div`
  width: 45%;
  background-color: white;
  border-radius: 0.75em;
  padding: 6%;
  box-shadow: 0 0.25em 0.375em rgba(0, 0, 0, 0.1);
`;

export const RoomImageSection = styled.div`
  width: 45%;
  background-color: white;
  border-radius: 0.75em;
  box-shadow: 0 0.25em 0.375em rgba(0, 0, 0, 0.1);
`;

export const RoomName = styled.h1`
  font-size: 1.5em;
  color: #333;
`;

export const RoomDetails = styled.p`
  font-size: 1em;
  color: #555;
`;

export const StatusBadge = styled.span<{ statusColor: string }>`
  background-color: ${(props) => props.statusColor};
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-align: center;
`;