import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import axios from 'axios';
import FormData from 'form-data';
import LoadingButton from '@mui/lab/LoadingButton';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

import { UseSelectorHook } from '../../_hook/HangulMakerHook';
import { createNFTActions } from '../../_slice/CreateNFTSlice';
import { DiscomposeSentence } from '../../commons/HangulMaker/DiscomposeHangul';

import api from '../../api/api';
import MasterpieceNFT from '../../json/MasterpieceNFT.json';
import { black, white } from '../../_css/ReactCSSProperties';

function blobToFile(theBlob:any, fileName:any) {
  return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: 'video/webm' });
}


export default function Mint() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const walletAddress = UseSelectorHook(state => state.user.currentUser.wallet_address);
  const videoBlob = UseSelectorHook(state => state.createNFT.NFTBlob);
  const filename = UseSelectorHook(state => state.areaSentence.value).filter((char: string) => char !== '\n').join('');
  const title = UseSelectorHook(state => state.createNFT.title);
  const description = UseSelectorHook(state => state.createNFT.description);
  const tag = UseSelectorHook(state => state.createNFT.tag).join(' ');

  const checkLetterAPI: {
    userWalletAddress: String;
    hangul: string[];
  } = {
    userWalletAddress: walletAddress,
    hangul: [''],
  };

  const [loading, setLoading] = useState(false);

  // 한글 문장 분해해서 store에 저장
  checkLetterAPI.hangul = DiscomposeSentence(filename);
  dispatch(createNFTActions.checkLetterAPI(checkLetterAPI));


  // Minting Logic Starts //

  const CA:any = process.env.REACT_APP_CONTRACT_ADDRESS;
  const ABI:any = MasterpieceNFT.abi;

  const GATEWAY_URL = 'https://ipfs.io/ipfs/';

  const file:any = videoBlob; // 민팅할 파일
  let cid:any;
  let jsonCid:any;

  // Minting
  const mintNFT = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const userAddress = accounts[0];
    const tokenURI = GATEWAY_URL + jsonCid;

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(ABI, CA);

    // minting - 민팅 중 화면에 대기 표시 필요
    const res = await contract.methods.create(userAddress, tokenURI).send({
      from: userAddress,
    });

    const txHash = res.transactionHash;
    const { tokenId } = res.events.Transfer.returnValues;
    console.log('The hash of your transaction is: ', txHash);
    console.log('tokenId: ', tokenId);

    const formData = new FormData();

    formData.append('imgFile', blobToFile(file, title + '.webm'));
    formData.append('cid', cid);
    formData.append('tokenId', tokenId);
    formData.append('contractAddress', CA);
    formData.append('txHash', txHash);
    formData.append('creatorWalletAddress', userAddress);
    formData.append('nftTitle', title);
    formData.append('nftDescription', description);
    formData.append('nftTag', tag);

    console.log('Minting Success');

    // countLetter -> MintFunction -> createNFT -> exhaustNFT 순차 진행
    const resCreateNFT = await axios.post(api.createNFT(), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (resCreateNFT.status === 200) {
      const resExhaustLetter = await axios.put(api.exhaustLetter(), checkLetterAPI, {});

      if (resExhaustLetter.status === 200) {
        console.log('Minting Backend Process Success');
        navigate(`/userpage/${walletAddress}`);
      }
    }
  };

  // IPFS 업로드
  const sendJSONToIPFS = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJsonToIPFS',
        data: {
          name: title,
          description,
          image: GATEWAY_URL + cid,
        },
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(res.data);
      jsonCid = res.data.IpfsHash;

      mintNFT(); // pass the winner
    } catch (error) {
      console.log('Error sending JSON to IPFS: ');
      console.log(error);
    }
  };

  const sendFileToIPFS = async () => {
    if (videoBlob) {
      try {
        const formData = new FormData();
        formData.append('file', videoBlob);

        const res = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,
          headers: {
            pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET_KEY}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(res.data);
        cid = res.data.IpfsHash;

        sendJSONToIPFS();
      } catch (error) {
        console.log('Error sending File to IPFS: ');
        console.log(error);
      }
    }
  };

  // countLetter -> MintFunction -> createNFT -> exhaustNFT 순차 진행
  async function runMinting() {
    const res = await axios.post(api.countLetter(), checkLetterAPI, {});
    if (res.data === true) {
      sendFileToIPFS();
    }
  }



  return (
    <LoadingButton
      onClick={() => {
        setLoading(true);
        runMinting();
      }}
      loading={loading}
      loadingPosition="end"
      endIcon={<CurrencyBitcoinIcon />}
      variant="contained"
      style={{background:black.toString(), color:white.toString()}}
    >
      Confirm Minting
    </LoadingButton>
  );
}