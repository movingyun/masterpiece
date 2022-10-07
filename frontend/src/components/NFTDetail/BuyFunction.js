import axios from 'axios';
import Web3 from 'web3';
import SaleFactory from '../../json/SaleFactory.json';
import Sale from '../../json/Sale.json';
import IERC20 from '../../json/IERC20.json';
import api from '../../api/api';

async function BuyFunction(price, tokenId, nftAddress) {
  const tokenCA = process.env.REACT_APP_SSF_CONTRACT_ADDRESS;
  const saleFactoryCA = process.env.REACT_APP_SALE_CONTRACT_ADDRESS;

  const web3 = new Web3(window.ethereum);
  const tokenABI = IERC20.abi;
  const tokenContract = new web3.eth.Contract(tokenABI, tokenCA);
  const saleFactoryABI = SaleFactory.abi;
  const saleFactoryContract = new web3.eth.Contract(saleFactoryABI, saleFactoryCA);
  const saleABI = Sale.abi;

  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const userAddress = accounts[0]; // 사용자의 지갑 주소

  const getSaleContract = saleAddress => {
    const SaleContract = new web3.eth.Contract(saleABI, saleAddress);
    return SaleContract;
  };

  // sale컨트랙트 주소로 해당 컨트랙트 가져오기
  const saleCA = await saleFactoryContract.methods.getSaleContractAddress(tokenId).call();
  const saleContract = getSaleContract(saleCA);

  // sale컨트랙트로 erc20토큰 전송권한 허용
  try {
    await tokenContract.methods.approve(saleCA, price).send({ from: userAddress });
  } catch {
    return false;
  }

  // 구매 요청
  try {
    await saleContract.methods.purchase(price).send({ from: userAddress });
  } catch {
    return false;
  }

  // 판매 기록 API 호출 - 수정 필요
  try {
    await axios.post(api.buyNFTFromList(), {
      nftHash: nftAddress,
      buyerWalletAddress: userAddress,
      saleContractAddress: saleCA,
    });
    console.log('success');
    try {
      await axios.put(api.possessionNFT(), {
        nftAddress,
      });
      console.log('possession success');
      return true;
    } catch {
      console.log('possession fail');
      return false;
    }
  } catch {
    console.log('fail');
    return false;
  }
}

export default BuyFunction;
