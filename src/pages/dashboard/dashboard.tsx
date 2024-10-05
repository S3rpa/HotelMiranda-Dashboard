import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar';
import {
  MainContainer,
  ContentContainer,
  StatsContainer,
  StatCard,
  IconContainer,
  StatText,
  StatValue,
  StatLabel,
  CardContainer,
  CalendarCard,
  StatsCard,
} from '../../components/dashboardStyles';
import { IoBed } from 'react-icons/io5';
import { BsFillHouseFill } from 'react-icons/bs';
import { MdLogout, MdOutlineLogin } from 'react-icons/md';
import { apiService } from '../../utils/apiService';
import { toast } from 'react-toastify';

interface DashboardData {
  bookingsCount: number;
  rooms: {
    total: number;
    bookedPercentage: string;
  };
  checkInsToday: number;
  checkOutsToday: number;
}

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = (import.meta as any).env.VITE_API_URL || ''; 

        const response = await fetch(`${apiUrl}/api/dashboard`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del dashboard');
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (error: any) {
        toast.error(error.message || 'Error al obtener los datos del dashboard');
        setError('Error al obtener los datos del dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!dashboardData) {
    return <p>No hay datos disponibles.</p>;
  }

  return (
    <MainContainer>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ContentContainer>
        <StatsContainer>
          <StatCard>
            <IconContainer>
              <IoBed size={28} />
            </IconContainer>
            <StatText>
              <StatValue>{dashboardData.bookingsCount || 0}</StatValue>
              <StatLabel>New Booking</StatLabel>
            </StatText>
          </StatCard>
          <StatCard>
            <IconContainer>
              <BsFillHouseFill size={28} />
            </IconContainer>
            <StatText>
              <StatValue>{dashboardData.rooms ? dashboardData.rooms.bookedPercentage : 0}%</StatValue>
              <StatLabel>Scheduled Room</StatLabel>
            </StatText>
          </StatCard>
          <StatCard>
            <IconContainer>
              <MdOutlineLogin size={28} />
            </IconContainer>
            <StatText>
              <StatValue>{dashboardData.checkInsToday || 0}</StatValue>
              <StatLabel>Check In</StatLabel>
            </StatText>
          </StatCard>
          <StatCard>
            <IconContainer>
              <MdLogout size={28} />
            </IconContainer>
            <StatText>
              <StatValue>{dashboardData.checkOutsToday || 0}</StatValue>
              <StatLabel>Check Out</StatLabel>
            </StatText>
          </StatCard>
        </StatsContainer>

        <CardContainer>
          {/* Contenedor de calendario (actualmente vacío) */}
          <CalendarCard />
          {/* Contenedor de gráfico (actualmente vacío) */}
          <StatsCard />
        </CardContainer>
      </ContentContainer>
    </MainContainer>
  );
};

export default Dashboard;