// const API_BASE_URL = 'http://localhost:8081/api';
const API_BASE_URL = 'http://j7a508.p.ssafy.io:8081//api';

// 경로
const USER_URL = '/user';
const HANGUL_URL = '/hangul';
const NFT_URL = '/nft';

// URI
// User
const SIGNIN_URL = '/signin';
const INVENTORY_URL = '/inventory';
const COLLECTED_URL = '/collected';
const CREATED_URL = '/created';
const FAVORITE_URL = '/favorite';
const ONSALE_URL = '/onsale';

// Hangul
const CONSONANT_URL = '/own/consonant';
const PICK_CONSONANT_URL = '/pick/consonant';
const PICK_VOWEL_URL = '/pick/vowel';
const FIRST_URL = '/first';

// createNFT
const COUNT_LETTER = '/count';

// composeHangul
const GET_FIRSTCOUNT_URL = '/own/first';
const GET_MIDDLECOUNT_URL = '/own/middle';
const GET_LASTCOUNT_URL = '/own/last';
const GET_CONSONANTCOUNT_URL = '/own/consonant';

// NFT
const DETAIL_URL = '/detail';

// Sale
const SALE_URL = '/sale';

const api = {
  // user
  signin: () => API_BASE_URL + USER_URL + SIGNIN_URL,
  fetchUser: (walletAddress: String) => API_BASE_URL + USER_URL + `?wallet-address=${walletAddress}`,
  fetchInventory: (walletAddress: String) =>
    API_BASE_URL + USER_URL + INVENTORY_URL + `?wallet-address=${walletAddress}`,
  fetchCollected: (walletAddress: String) =>
    API_BASE_URL + USER_URL + COLLECTED_URL + `?wallet-address=${walletAddress}`,
  fetchCreated: (walletAddress: String) => API_BASE_URL + USER_URL + CREATED_URL + `?wallet-address=${walletAddress}`,
  fetchFavorite: (walletAddress: String) => API_BASE_URL + USER_URL + FAVORITE_URL + `?wallet-address=${walletAddress}`,
  fetchOnsale: (walletAddress: String) => API_BASE_URL + USER_URL + ONSALE_URL + `?wallet-address=${walletAddress}`,

  // hangul
  fetchConsonant: (walletAddress: String) =>
    API_BASE_URL + HANGUL_URL + CONSONANT_URL + `?wallet-address=${walletAddress}`,
  pickConsonant: () => API_BASE_URL + HANGUL_URL + PICK_CONSONANT_URL,
  pickVowel: () => API_BASE_URL + HANGUL_URL + PICK_VOWEL_URL,
  fetchFirst: () => API_BASE_URL + HANGUL_URL + FIRST_URL,

  // createNFT
  countLetter: () => API_BASE_URL + HANGUL_URL + COUNT_LETTER,
  createNFT: () => API_BASE_URL + NFT_URL,
  exhaustLetter: () => API_BASE_URL + HANGUL_URL,

  // composeHangul
  getFisrt: (walletAddress: String) =>
    API_BASE_URL + HANGUL_URL + GET_FIRSTCOUNT_URL + `?wallet-address=${walletAddress}`,
  getMiddle: (walletAddress: String) =>
    API_BASE_URL + HANGUL_URL + GET_MIDDLECOUNT_URL + `?wallet-address=${walletAddress}`,
  getLast: (walletAddress: String) =>
    API_BASE_URL + HANGUL_URL + GET_LASTCOUNT_URL + `?wallet-address=${walletAddress}`,
  getConsonant: (walletAddress: String) =>
    API_BASE_URL + HANGUL_URL + GET_CONSONANTCOUNT_URL + `?wallet-address=${walletAddress}`,

  // NFT
  fetchAllNFT: () => API_BASE_URL + NFT_URL,
  fetchNFTDetail: (nftAddress: String) => API_BASE_URL + NFT_URL + DETAIL_URL + `?nft-address=${nftAddress}`,

  // Sale
  fetchSaleHistory: (nftAddress: String) => API_BASE_URL + SALE_URL + `?nftHash=${nftAddress}`,
};

export default api;
