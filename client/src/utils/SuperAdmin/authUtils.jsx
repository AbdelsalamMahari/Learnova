import jwt_decode from 'jwt-decode';

export function isSuperAdminUser(token) {
  if (token) {
    const decodedToken = jwt_decode(token);
    return decodedToken.isSuperAdmin;
  }
  return false;
}
