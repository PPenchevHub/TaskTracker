import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();

  if (!isAuthenticated()) {
    navigate('/login');
    return null;
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
