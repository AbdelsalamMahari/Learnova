import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { fetchUserInfoFromToken } from '../../utils/fetchUser/FetchUser';

function AuthWrapper({ element }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      const userInfo = await fetchUserInfoFromToken();
      if (userInfo) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    }
    checkAuthentication();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? element : <Navigate to="/login" />;
}

export default AuthWrapper;
