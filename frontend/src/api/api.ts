// const API_BASE_URL = 'http://localhost:8081/api';
const API_BASE_URL = 'https://j7a508.p.ssafy.io/api';

// 경로
const USER_URL = '/user';
const HANGUL_URL = '/hangul';
const NFT_URL = '/nft';
const GAME_URL = '/game';

// URI
// User
const SIGNIN_URL = '/signin';
const INVENTORY_URL = '/inventory';
const COLLECTED_URL = '/collected';
const CREATED_URL = '/created';
const FAVORITE_URL = '/favorite';
const ONSALE_URL = '/onsale';
const TICKET_URL = '/ticket';

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

// translate
const TRANSLATE = '/papago';

// NFT
const DETAIL_URL = '/detail';
const OWNER_URL = '/owner';
const SEARCH_URL = '/search';
const POSESSION_URL = '/posession';

// Sale
const SALE_URL = '/sale';

// Like
const LIKE_URL = '/like';

// 한글표기변환
const CONVERT_URL = '/convert';

// Game
const LOG_URL = '/log';

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
  editUser: () => API_BASE_URL + USER_URL,
  fetchTicket: (walletAddress: String) => API_BASE_URL + USER_URL + TICKET_URL + `?wallet-address=${walletAddress}`,

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

  // trnaslate
  translate: () => API_BASE_URL + TRANSLATE,

  // NFT
  fetchAllNFT: () => API_BASE_URL + NFT_URL,
  fetchNFTDetail: (nftAddress: String) => API_BASE_URL + NFT_URL + DETAIL_URL + `?nft-address=${nftAddress}`,
  fetchNFTOwner: (nftAddress: String) => API_BASE_URL + NFT_URL + OWNER_URL + `?nftHash=${nftAddress}`,
  listNFTOnSale: () => API_BASE_URL + NFT_URL + SALE_URL,
  searchNFT: (category: String, keyword: String) =>
    API_BASE_URL + NFT_URL + SEARCH_URL + `?category=${category}&keyword=${keyword}`,
  possessionNFT: () => API_BASE_URL + NFT_URL + POSESSION_URL,

  // Sale
  buyNFTFromList: () => API_BASE_URL + SALE_URL,
  fetchSaleHistory: (nftAddress: String) => API_BASE_URL + SALE_URL + `?nftHash=${nftAddress}`,

  // Like
  toggleLike: () => API_BASE_URL + LIKE_URL,

  // 한글표기변환
  getConvertHangul: (text:string) => API_BASE_URL + CONVERT_URL + `?englishname=${text}`,

  // Game
  fetchGameData: () => API_BASE_URL + GAME_URL,
  putGameLog: () => API_BASE_URL + GAME_URL + LOG_URL,
};

export default api;
