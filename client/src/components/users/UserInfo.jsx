import { useEffect, useState } from 'react';
import { fetchUserInfoFromToken } from "../../utils/fetchUser/FetchUser";

export default function UserInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const userInfo = await fetchUserInfoFromToken();
        setUser(userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    getUserInfo();
  }, []);

  return user;
}
