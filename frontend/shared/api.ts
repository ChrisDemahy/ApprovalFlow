import axios from 'axios';
// create axios object with propper settings
const createAuthenticatedInstance = (token) => {
  const instance = axios.create({
    baseURL: 'localhost:3000/api/',
    // timeout: 1000,
    headers: { Authorization: `Token ${token}` },
  });
  return instance;
};

export default createAuthenticatedInstance;
