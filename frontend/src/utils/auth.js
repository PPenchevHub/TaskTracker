import jwt from 'jsonwebtoken';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken = jwt.verify(token, 'testing');
      console.log(decodedToken);
      return true;
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  }

  return false;
};
