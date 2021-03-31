/* eslint-disable max-len */
// == Import npm
import jwtDecode from 'jwt-decode';

/**
 * return a decoded token containing a usefull payload
 * @param {string} token from JWT authentification;
 */

export const decodeToken = (token) => {
  const decodedToken = jwtDecode(token);
  return decodedToken;
};

export const tokenHasNotExpired = (tokenExpirationDate) => tokenExpirationDate > Math.floor(Date.now() / 1000);
