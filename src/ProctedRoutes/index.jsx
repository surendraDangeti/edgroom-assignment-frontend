// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate } from 'react-router-dom';
// import auth from '../components/auth'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element }) => {
    let auth = JSON.parse(localStorage.getItem('auth'));
    let token = auth?.token
    if (!token) {
      console.log('Redirecting to /');
      return <Navigate to="/" />;
    }
    return element;
  };
  
  

export default ProtectedRoute;
