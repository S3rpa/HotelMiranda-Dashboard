import React, { useState, useEffect } from 'react'; // Asegúrate de que useState y useEffect estén importados
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Booking from './pages/booking/booking';
import NewBooking from './pages/booking/NewBooking'; // Importa la nueva página
import BookingDetails from './pages/booking/bookingDetails';
import Room from './pages/room/room';
import RoomDetail from './pages/room/roomDetails';
import Users from './pages/users/users';
import UsersDetail from './pages/users/usersDetails';
import Contact from './pages/contact/contact';
import ContactDetail from './pages/contact/contactDetails';
import Login from './components/Login';
import PrivateRoute from './components/privateRoute';
import Sidebar from './components/sidebar';
import Index from './pages/index/index';
import NavBar from './components/NavBar';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
`;

const AppContent = styled.div`
  flex-grow: 1;
`;

const ProtectedRoutes = ({ auth, setAuth, isSidebarOpen, toggleSidebar }) => (
  <AppContainer>
    {auth && <Sidebar isopen={isSidebarOpen} toggleSidebar={toggleSidebar} />} 
    <AppContent>
      <NavBar setAuth={setAuth} toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/index" element={<Index setAuth={setAuth} />} />
        <Route path="/bookings" element={<Booking setAuth={setAuth} />} />
        <Route path="/bookings/new" element={<NewBooking />} />
        <Route path="/bookings/:id" element={<BookingDetails setAuth={setAuth} />} />
        <Route path="/rooms" element={<Room setAuth={setAuth} />} />
        <Route path="/rooms/:id" element={<RoomDetail setAuth={setAuth} />} />
        <Route path="/contact" element={<Contact setAuth={setAuth} />} />
        <Route path="/contact/:id" element={<ContactDetail setAuth={setAuth} />} />
        <Route path="/users" element={<Users setAuth={setAuth} />} />
        <Route path="/users/:id" element={<UsersDetail setAuth={setAuth} />} />
        <Route path="*" element={<Navigate to="/bookings" />} />
      </Routes>
    </AppContent>
  </AppContainer>
);

const App = () => {
  const [auth, setAuth] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth === 'true') {
      setAuth(true);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setAuth={setAuth} />} />
        <Route path="/*" element={<PrivateRoute auth={auth}><ProtectedRoutes auth={auth} setAuth={setAuth} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
