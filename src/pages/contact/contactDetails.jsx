import React from 'react';
import { useParams } from 'react-router-dom';

const ContactDetail = () => {
  const { id } = useParams();
  return <h1>Contact Details Page for ID: {id}</h1>;
};

export default ContactDetail;
