import { jwtDecode } from 'jwt-decode';

// JWT 디코드 및 역할 추출 함수
export const getEmailFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub || null;
  } catch (error) {
    console.log('Invalid token', error);
    return null;
  }
};
