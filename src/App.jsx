import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Booking from './pages/booking/booking';
import Room from './pages/room/room';
import Concierge from './pages/concierge/concierge';
import Contact from './pages/contact/contact';
import styled from 'styled-components';
import Login from './components/Login';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/bookings" element={ <Booking /> } />
      <Route path="/rooms" element={ <Room /> } />
      <Route path="/contact" element={ <Contact /> } />
      <Route path="/concierge" element={ <Concierge /> } />
    </Routes>
  </BrowserRouter>
);

export default App;
