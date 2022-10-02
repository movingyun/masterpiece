import axios from 'axios';
import Web3 from 'web3';
import api from '../../api/api';
import MasterpieceNFT from '../../json/MasterpieceNFT.json';
import SaleFactory from '../../json/SaleFactory.json';

async function SellFunction(price, tokenId, nftAddress) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const userAddress = accounts[0];
    const web3 = new Web3(window.ethereum);

    const saleFactoryCA = process.env.REACT_APP_SALE_CONTRACT_ADDRESS;
    const nftCA = process.env.REACT_APP_CONTRACT_ADDRESS;
    const tokenCA = process.env.REACT_APP_SSF_CONTRACT_ADDRESS;
    const nftABI = MasterpieceNFT.abi;
    const saleFactoryABI = SaleFactory.abi;
    const saleFactoryContract = new web3.eth.Contract(saleFactoryABI, saleFactoryCA);
    const NFTContract = new web3.eth.Contract(nftABI, nftCA);

    // 판매등록
    const response = 
        await saleFactoryContract.methods.createSale(tokenId, price, tokenCA, nftCA).send({ from: userAddress });
    console.log(response);

    const saleCA = await saleFactoryContract.methods.getSaleContractAddress(tokenId).call();
    // 토큰 권한 승인시키기
    await NFTContract.methods.setApprovalForAll(saleCA, true).send({ from: userAddress });

    // API 호출 - NFT를 판매 중으로 변경
    axios
        .put(api.listNFTOnSale(), { nftAddress, price })
        .then(() => {
            console.log('success');
        })
        .catch(() => {
            console.log('fail');
        });
}

export default SellFunction;
