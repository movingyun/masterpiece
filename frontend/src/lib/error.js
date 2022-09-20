const NO_ETHEREUM_OBJECT = /No Ethereum provider was found on window.ethereum/;

// eslint-disable-next-line
export const isNoEthereumObject = err => NO_ETHEREUM_OBJECT.test(err);
