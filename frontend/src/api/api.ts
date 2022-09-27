// const API_BASE_URL = 'http://localhost:8080/api';
const API_BASE_URL = 'http://j7a508.p.ssafy.io:8081/api'

// 경로
const USER_URL = '/user';

// URI
const SIGNIN_URL = '/signin';

const api = {
  signin: () => API_BASE_URL + USER_URL + SIGNIN_URL,
  fetchUser: (walletAddress: String) => API_BASE_URL + USER_URL + `?wallet-address=${walletAddress}`,
};

export default api;
