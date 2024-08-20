import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/sidebar';
import guests from '../../data/guest';
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
  gap: 1.5rem; /* Añade espacio entre las tarjetas */
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
  background-color: #ffeceb;
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const Dashboard = () => {
  const [stats, setStats] = useState({
    bookings: 0,
    scheduledRooms: 0,
    checkIns: 0,
    checkOuts: 0,
  });

  useEffect(() => {
    const totalBookings = guests.length;
    const scheduledRooms = (guests.filter(guest => guest.status === 'Booked').length / totalBookings) * 100;
    const checkIns = guests.filter(guest => new Date(guest.checkIn) <= new Date() && new Date(guest.checkOut) >= new Date()).length;
    const checkOuts = guests.filter(guest => new Date(guest.checkOut) < new Date()).length;

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
              <IoBed size={28} color="#E23428" />
            </IconContainer>
            <StatText>
              <StatValue>{stats.bookings}</StatValue>
              <StatLabel>Bookings</StatLabel>
            </StatText>
          </StatCard>
          <StatCard>
            <IconContainer>
              <BsFillHouseFill size={28} color="#E23428" />
            </IconContainer>
            <StatText>
              <StatValue>{stats.scheduledRooms}%</StatValue>
              <StatLabel>Scheduled Rooms</StatLabel>
            </StatText>
          </StatCard>
          <StatCard>
            <IconContainer>
              <MdOutlineLogin size={28} color="#E23428" />
            </IconContainer>
            <StatText>
              <StatValue>{stats.checkIns}</StatValue>
              <StatLabel>Check In</StatLabel>
            </StatText>
          </StatCard>
          <StatCard>
            <IconContainer>
              <MdLogout size={28} color="#E23428" /> {/* Uso del icono correcto para "Check Out" */}
            </IconContainer>
            <StatText>
              <StatValue>{stats.checkOuts}</StatValue>
              <StatLabel>Check Out</StatLabel>
            </StatText>
          </StatCard>
        </StatsContainer>
      </ContentContainer>
    </MainContainer>
  );
};

export default Dashboard;
