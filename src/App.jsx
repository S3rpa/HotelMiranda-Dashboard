import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Booking from './pages/booking/booking';
import UpdateBooking from './pages/booking/UpdateBooking';
import NewBooking from './pages/booking/NewBooking';
import BookingDetails from './pages/booking/bookingDetails';
import Room from './pages/room/room';
import RoomDetail from './pages/room/roomDetails';
import Users from './pages/users/users';
import UsersDetail from './pages/users/usersDetails';
import UsersEdit from './pages/users/usersEdit';
import Contact from './pages/contact/contact';
import ContactDetail from './pages/contact/contactDetails';
import Login from './components/Login';
import PrivateRoute from './components/privateRoute';
import Sidebar from './components/sidebar';
import Index from './pages/index/index';
import NavBar from './components/NavBar';
import styled from 'styled-components';
import { AuthProvider } from './components/authContext';
import { Provider } from 'react-redux';
import { store } from '../app/store';

const AppContainer = styled.div`
  display: flex;
`;

const AppContent = styled.div`
  flex-grow: 1;
`;

const ProtectedRoutes = ({ isSidebarOpen, toggleSidebar }) => (
  <AppContainer>
    <Sidebar isopen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    <AppContent>
      <NavBar toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/index" element={<Index />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/bookings/new" element={<NewBooking />} />
        <Route path="/bookings/update/:id" element={<UpdateBooking />} />
        <Route path="/bookings/:id" element={<BookingDetails />} />
        <Route path="/rooms" element={<Room />} />
        <Route path="/rooms/:id" element={<RoomDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/:id" element={<ContactDetail />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/edit/:id" element={<UsersEdit />} />
        <Route path="/users/:id" element={<UsersDetail />} />
        <Route path="*" element={<Navigate to="/bookings" />} />
      </Routes>
    </AppContent>
  </AppContainer>
);

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Provider store={store}> 
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/*" element={<PrivateRoute><ProtectedRoutes isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
};

export default App;
