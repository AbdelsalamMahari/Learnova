import jwt_decode from 'jwt-decode';

export function isInstructorUser(token) {
  if (token) {
    const decodedToken = jwt_decode(token);
    return decodedToken.isInstructor;
  }
  return false;
}
