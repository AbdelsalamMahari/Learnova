import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

export async function fetchUserInfoFromToken() {
    const token = Cookies.get("token"); // Get the token from cookies
  let userId;

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      userId = decodedToken.id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    console.warn("Token not found in localStorage.");
  }

  if (userId) {
    try {
      const response = await axios.get(`http://localhost:5000/users/find/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return null;
}
