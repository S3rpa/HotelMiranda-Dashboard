import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/sidebar';
import { guest } from '../../../db.json'
import { BsFillHouseFill } from 'react-icons/bs';
import { IoBed } from 'react-icons/io5';
import { MdLogout, MdOutlineLogin } from 'react-icons/md';

const MainContainer = styled.div`
  display: flex;
  background-color: #f7f7f7;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #f7f7f7;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
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

const IconContainer = styled.div`
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

const StatText = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.h3`
  font-size: 2rem;
  margin: 0;
  color: #333;
`;

const StatLabel = styled.p`
  font-size: 1rem;
  color: #686868;
  margin: 0;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const CalendarCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 48%;
  height: 300px;
`;

const StatsCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 48%;
  height: 300px;
`;

const Dashboard = () => {
  const [stats, setStats] = useState({
    bookings: 0,
    scheduledRooms: 0,
    checkIns: 0,
    checkOuts: 0,
  });

  useEffect(() => {
    const totalBookings = guest.length;
    const scheduledRooms = (guest.filter(guest => guest.status === 'Booked').length / totalBookings) * 100;
    const checkIns = guest.filter(guest => new Date(guest.checkIn) <= new Date() && new Date(guest.checkOut) >= new Date()).length;
    const checkOuts = guest.filter(guest => new Date(guest.checkOut) < new Date()).length;

    setStats({
      bookings: totalBookings,
      scheduledRooms: scheduledRooms.toFixed(1),
      checkIns: checkIns,
      checkOuts: checkOuts,
    });
  }, []);

  return (
    <MainContainer>
      <Sidebar />
      <ContentContainer>
        <StatsContainer>
          <StatCard>
            <IconContainer>
              <IoBed size={28} />
            </IconContainer>
            <StatText>
              <StatValue>{stats.bookings}</StatValue>
              <StatLabel>New Booking</StatLabel>
            </StatText>
          </StatCard>
          <StatCard>
            <IconContainer>
              <BsFillHouseFill size={28} />
            </IconContainer>
            <StatText>
              <StatValue>{stats.scheduledRooms}%</StatValue>
              <StatLabel>Scheduled Room</StatLabel>
            </StatText>
          </StatCard>
          <StatCard>
            <IconContainer>
              <MdOutlineLogin size={28} />
            </IconContainer>
            <StatText>
              <StatValue>{stats.checkIns}</StatValue>
              <StatLabel>Check In</StatLabel>
            </StatText>
          </StatCard>
          <StatCard>
            <IconContainer>
              <MdLogout size={28} />
            </IconContainer>
            <StatText>
              <StatValue>{stats.checkOuts}</StatValue>
              <StatLabel>Check Out</StatLabel>
            </StatText>
          </StatCard>
        </StatsContainer>

        <CardContainer>
          <CalendarCard />
          <StatsCard />
        </CardContainer>
      </ContentContainer>
    </MainContainer>
  );
};

export default Dashboard;
