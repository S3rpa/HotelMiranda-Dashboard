import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar'
import guest from '../../data/guest'
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
} from '../../components/dashboardStyles'
import { Stats } from '../../interfaces/dashboardInterfaces'
import { IoBed } from 'react-icons/io5'
import { BsFillHouseFill } from 'react-icons/bs'
import { MdLogout, MdOutlineLogin } from 'react-icons/md'

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const [stats, setStats] = useState<Stats>({
    bookings: 0,
    scheduledRooms: '0',
    checkIns: 0,
    checkOuts: 0,
  })

  useEffect(() => {
    const totalBookings = guest.length
    const scheduledRooms = (
      (guest.filter((guest) => guest.status === 'Booked').length / totalBookings) *
      100
    ).toFixed(1)
    const checkIns = guest.filter(
      (guest) =>
        new Date(guest.checkIn) <= new Date() && new Date(guest.checkOut) >= new Date()
    ).length
    const checkOuts = guest.filter((guest) => new Date(guest.checkOut) < new Date()).length

    setStats({
      bookings: totalBookings,
      scheduledRooms,
      checkIns,
      checkOuts,
    })
  }, [])

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
  )
}

export default Dashboard