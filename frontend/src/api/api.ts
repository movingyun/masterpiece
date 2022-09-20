const API_BASE_URL = 'http://localhost:8080/api';
// const API_BASE_URL = 'http://i7a508.p.ssafy.io:5000/api'

// 경로
const USER_URL = '/user';

// URI
const SIGNIN_URL = '/signin';

const api = {
  signin: () => API_BASE_URL + USER_URL + SIGNIN_URL,
};

export default api;
