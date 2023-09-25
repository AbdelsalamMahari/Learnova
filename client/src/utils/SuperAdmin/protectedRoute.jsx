import React from 'react';
import { Navigate } from 'react-router-dom';
import { isSuperAdminUser } from './authUtils';
import Cookies from "js-cookie";

function SuperAdminRoute({ element }) {
  const token = Cookies.get('token');
  const isSuperAdmin = isSuperAdminUser(token);

  return isSuperAdmin ? element : <Navigate to="/nopage" />;
}

export default SuperAdminRoute;
