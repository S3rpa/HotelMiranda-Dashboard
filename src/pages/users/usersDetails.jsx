import React from 'react';
import { useParams } from 'react-router-dom';

const UsersDetail = () => {
  const { id } = useParams();
  return <h1>User Detail Page for ID: {id}</h1>;
};

export default UsersDetail;
