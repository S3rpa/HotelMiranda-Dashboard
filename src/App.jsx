import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Booking from './pages/booking/booking';
import BookingDetail from './pages/booking/bookingDetails';
import Room from './pages/room/room';
import RoomDetail from './pages/room/roomDetails';
import Users from './pages/users/users';
import UsersDetail from './pages/users/usersDetails';
import Contact from './pages/contact/contact';
import ContactDetail from './pages/contact/contactDetails';
import Login from './components/Login';
import PrivateRoute from './components/privateRoute';

const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth === 'true') {
      setAuth(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login setAuth={setAuth} /> } />
        <Route path="/rooms" element={ 
          <PrivateRoute auth={auth}>
            <Room />
          </PrivateRoute> 
        } />
        <Route path="/rooms/:id" element={ 
          <PrivateRoute auth={auth}>
            <RoomDetail />
          </PrivateRoute> 
        } />
        <Route path="/bookings" element={ 
          <PrivateRoute auth={auth}>
            <Booking />
          </PrivateRoute> 
        } />
        <Route path="/bookings/:id" element={ 
          <PrivateRoute auth={auth}>
            <BookingDetail />
          </PrivateRoute> 
        } />
        <Route path="/contact" element={ 
          <PrivateRoute auth={auth}>
            <Contact />
          </PrivateRoute> 
        } />
        <Route path="/contact/:id" element={ 
          <PrivateRoute auth={auth}>
            <ContactDetail />
          </PrivateRoute> 
        } />
        <Route path="/users" element={ 
          <PrivateRoute auth={auth}>
            <Users />
          </PrivateRoute> 
        } />
        <Route path="/users/:id" element={ 
          <PrivateRoute auth={auth}>
            <UsersDetail />
          </PrivateRoute> 
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;