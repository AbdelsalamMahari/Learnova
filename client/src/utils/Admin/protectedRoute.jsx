import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminUser } from './authUtils';
import Cookies from "js-cookie";

function AdminRoute({ element }) {
  const token = Cookies.get('token');
  const isAdmin = isAdminUser(token);

  return isAdmin ? element : <Navigate to="/nopage" />;
}

export default AdminRoute;
