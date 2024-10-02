import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Booking from './pages/booking/booking'
import UpdateBooking from './pages/booking/UpdateBooking'
import NewBooking from './pages/booking/NewBooking'
import BookingDetails from './pages/booking/bookingDetails'
import Room from './pages/room/room'
import RoomDetail from './pages/room/roomDetails'
import Users from './pages/users/users'
import UsersDetail from './pages/users/usersDetails'
import UsersEdit from './pages/users/usersEdit'
import NewUser from './pages/users/NewUser'
import ContactPage from './pages/contact/contact'
import Login from './components/Login'
import Sidebar from './components/sidebar'
import Dashboard from './pages/dashboard/dashboard'
import NavBar from './components/NavBar'
import PrivateRoute from './components/privateRoute'
import styled, { ThemeProvider } from 'styled-components'
import { AuthProvider } from './components/authContext'
import { Provider } from 'react-redux'
import { store } from '../app/store'

interface Theme {
  backgroundColor: string
  color: string
}

const AppContainer = styled.div`
  display: flex;
`

const AppContent = styled.div`
  flex-grow: 1;
`

const lightTheme: Theme = {
  backgroundColor: '#F7F7F7',
  color: '#333',
}

const darkTheme: Theme = {
  backgroundColor: '#2D2D2D',
  color: '#F7F7F7',
}

interface ProtectedRoutesProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
  theme: Theme
  toggleTheme: () => void
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  isSidebarOpen,
  toggleSidebar,
  theme,
  toggleTheme,
}) => (
  <ThemeProvider theme={theme}>
    <AppContainer>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <AppContent>
        <NavBar toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/bookings/new" element={<NewBooking />} />
          <Route path="/bookings/update/:id" element={<UpdateBooking />} />
          <Route path="/bookings/:id" element={<BookingDetails />} />     
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/new" element={<NewUser />} />
          <Route path="/users/edit/:id" element={<UsersEdit />} />
          <Route path="/users/:id" element={<UsersDetail />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AppContent>
    </AppContainer>
  </ThemeProvider>
)

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <ProtectedRoutes
                    isSidebarOpen={isOpen}
                    toggleSidebar={toggleSidebar}
                    theme={isDarkMode ? darkTheme : lightTheme}
                    toggleTheme={toggleTheme}
                  />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  )
}

export default App