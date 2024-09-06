import { styled } from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  background-color: #f7f7f7;
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #f7f7f7;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 22%;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
`;

export const IconContainer = styled.div`
  background-color: rgb(255, 237, 236);
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(226, 52, 40);
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: rgb(226, 52, 40);
    color: white;
  }
`;

export const StatText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatValue = styled.h3`
  font-size: 2rem;
  margin: 0;
  color: #333;
`;

export const StatLabel = styled.p`
  font-size: 1rem;
  color: #686868;
  margin: 0;
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const CalendarCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 48%;
  height: 300px;
`;

export const StatsCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 48%;
  height: 300px;
`;
