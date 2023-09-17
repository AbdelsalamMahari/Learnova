import React from 'react';
import { Navigate } from 'react-router-dom';
import { isInstructorUser } from './authUtils';
import Cookies from "js-cookie";

function InstructorRoute({ element }) {
  const token = Cookies.get('token');
  const isInstructor = isInstructorUser(token);

  return isInstructor ? element : <Navigate to="/nopage" />;
}

export default InstructorRoute;
