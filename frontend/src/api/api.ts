const API_BASE_URL = 'http://localhost:8081/api';
// const API_BASE_URL = 'http://j7a508.p.ssafy.io:8081//api';

// 경로
const USER_URL = '/user';
const HANGUL_URL = '/hangul';

// URI
// User
const SIGNIN_URL = '/signin';
const INVENTORY_URL = '/inventory';

// Hangul
const CONSONANT_URL = '/own/consonant';
const PICK_CONSONANT_URL = '/pick/consonant';
const PICK_VOWEL_URL = '/pick/vowel';
const FIRST_URL = '/first';

// composeHangul
const GET_FIRSTCOUNT_URL = '/own/first';
const GET_MIDDLECOUNT_URL= '/own/middle';
const GET_LASTCOUNT_URL = '/own/last';
const GET_CONSONANTCOUNT_URL = '/own/consonant';

const api = {
  // user
  signin: () => API_BASE_URL + USER_URL + SIGNIN_URL,
  fetchUser: (walletAddress: String) => API_BASE_URL + USER_URL + `?wallet-address=${walletAddress}`,
  fetchInventory: (walletAddress: String) =>
    API_BASE_URL + USER_URL + INVENTORY_URL + `?wallet-address=${walletAddress}`,

  // hangul
  fetchConsonant: (walletAddress: String) =>
    API_BASE_URL + HANGUL_URL + CONSONANT_URL + `?wallet-address=${walletAddress}`,
  pickConsonant: () => API_BASE_URL + HANGUL_URL + PICK_CONSONANT_URL,
  pickVowel: () => API_BASE_URL + HANGUL_URL + PICK_VOWEL_URL,
  fetchFirst: () => API_BASE_URL + HANGUL_URL + FIRST_URL,

  // composeHangul
  getFisrt: (walletAddress: String) => API_BASE_URL + HANGUL_URL + GET_FIRSTCOUNT_URL + `?wallet-address=${walletAddress}`,
  getMiddle: (walletAddress: String) => API_BASE_URL + HANGUL_URL + GET_MIDDLECOUNT_URL + `?wallet-address=${walletAddress}`,
  getLast: (walletAddress: String) => API_BASE_URL + HANGUL_URL + GET_LASTCOUNT_URL + `?wallet-address=${walletAddress}`,
  getConsonant: (walletAddress: String) => API_BASE_URL + HANGUL_URL + GET_CONSONANTCOUNT_URL + `?wallet-address=${walletAddress}`,
};

export default api;
