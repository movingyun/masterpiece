// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import dotenv from 'dotenv';
import axios from 'axios';
// import fs from 'fs';
import FormData from 'form-data';
import Web3 from 'web3';
// import Contract from 'web3-eth-contract';
// import pinataSDK from '@pinata/sdk';




import { DiscomposeSentence } from '../../commons/HangulMaker/DiscomposeHangul'
import MasterpieceNFT from '../../json/MasterpieceNFT.json'


// dotenv.config();

function MintFunction(Infos) {
  // const navigate = useNavigate();
  console.log("들어옴?")

  const dispatch = useDispatch();

  const walletAddress = useSelector(state => state.user.currentUser.wallet_address);

  // NFT webm blob
  const videoBlob = useSelector(state => state.createNFT.NFTBlob);

  // 한글 문장 = filename
  const hangulSentence = useSelector(state => state.areaSentence.value);
  const filename = hangulSentence.filter(char => char !== '\n').join('');

  // 한글 문장 분해해서 store에 저장
  dispatch(createNFTActions.decomposeHangul(DiscomposeSentence(filename)));

  // NFTInput
  const title = useSelector(state => state.createNFT.title);
  const description = useSelector(state => state.createNFT.description);
  const tag = useSelector(state => state.createNFT.tag).join(' ');
  
  /**
   * pinFileToIPFS -> pinJSONToIPFS -> NFT 민팅 -> nft생성 api 호출
   */

  // const pinata = pinataSDK(process.env.REACT_APP_PINATA_API_KEY, process.env.REACT_APP_PINATA_API_SECRET_KEY);
  const CA = process.env.REACT_APP_CONTRACT_ADDRESS;
  // const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  // const web3 = new Web3('ws://20.196.209.2:6174');
  // Contract.setProvider('ws://20.196.209.2:6174');
  const ABI = MasterpieceNFT.abi;


  const GATEWAY_URL = 'https://ipfs.io/ipfs/';

  const file = videoBlob; // 민팅할 파일
  // const readableStreamForFile = videoBlob.stream();

  // 민팅된 이미지의 제목 - 받은 파일의 이름으로 설정
  // const filename = '이찬혁';
  // 메타데이터의 제목 = NFT의 제목
  // let title = document.getElementById("title").value;
  // const title = 'Hip NFT';
  // 사용자가 작성한 NFT 설명
  // let description = document.getElementById("description").value;
  // const description = '가나다라마바사';
  // 사용자가 작성한 태그
  // let tag = document.getElementById("tags").value;
  // const tag = '힙합 동묘 쇼미';
  // const options = {
  //   pinataMetadata: {
  //     name: filename,
  //   },
  //   pinataOptions: {
  //     cidVersion: 0,
  //   },
  // };
  // const options2 = {
  //   pinataMetadata: {
  //     name: title,
  //   },
  //   pinataOptions: {
  //     cidVersion: 0,
  //   },
  // };

  // IPFS 업로드
  let cid;
  let jsonCid;

  // Minting
  const mintNFT = async () => {
    const userAddress = walletAddress; // 로그인한 사용자의 지갑 주소
    const tokenURI = GATEWAY_URL + jsonCid;

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(ABI, CA);
    
    // minting
    await contract.methods
      .create(userAddress, tokenURI)
      .send({
        from: userAddress,
      })
      .then(receipt => {
        const txHash = receipt.transactionHash;
        const { topics } = receipt.logs[0];
        const tokenId = parseInt(topics[topics.length - 1], 16);
        console.log(tokenId);

        const formData = new FormData();
        formData.append('imgFile', file);
        formData.append('cid', cid);
        formData.append('contractAddress', CA);
        formData.append('txHash', txHash);
        formData.append('tokenId', tokenId);
        formData.append('creatorWalletAddress', userAddress);
        formData.append('nftTitle', title);
        formData.append('nftDescription', description);
        formData.append('nftTag', tag);

        // 마음이 걸려요! 비동기....
        try {
          // formData store에 저장
          dispatch(createNFTActions.mintingData(formData));
  
          // countLetter -> createNFT -> exhaustNFT 순차 진행
          dispatch(countLetter(formData));
        } finally {
          // navigate('/nftlist');
        }

      })
      .catch(err => {
        console.log(err);
      });
  };

    const sendJSONToIPFS = async () => {
      try {
        await axios({
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
          },
        });

        // console.log('final ', `ipfs://${resJSON.data.IpfsHash}`);
        // const tokenURI = `ipfs://${resJSON.data.IpfsHash}`;
        // console.log('Token URI', tokenURI);

        mintNFT(); // pass the winner
      } catch (error) {
        console.log('JSON to IPFS: ');
        console.log(error);
      }
    };

  const sendFileToIPFS = async () => {
    if (videoBlob) {
      try {
        const formData = new FormData();
        formData.append('file', videoBlob);
        formData.append('name', filename);

        const resFile = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,
          headers: {
            pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET_KEY}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        cid = resFile.IpfsHash;

      sendJSONToIPFS();

        // const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        // console.log(ImgHash);
        // Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log('Error sending File to IPFS: ');
        console.log(error);
      }
    }
  };

  sendFileToIPFS();

  // pinata
  //   .pinFileToIPFS(readableStreamForFile, options)
  //   .then(result => {
  //     console.log(result);
  //     cid = result.IpfsHash;

  //     const body = {
  //       name: title,
  //       description,
  //       image: GATEWAY_URL + cid,
  //       attributes: [{ trait_type: 'Unknown', value: 'Unknown' }],
  //     };

  //     pinata
  //       .pinJSONToIPFS(body, options2)
  //       .then(result2 => {
  //         console.log(result2);
  //         jsonCid = result2.IpfsHash;
  //         const userAddress = walletAddress; // 로그인한 사용자의 지갑 주소
  //         const tokenURI = GATEWAY_URL + jsonCid;
  //       })
  //       .catch(error => {
  //         console.log('pinJSONToIPFS error!');
  //         console.log(error);
  //       });
  //   })
  //   .catch(error => {
  //     console.log('pinFileToIPFS error!');
  //     console.log(error);
  //   });

  // 전부 성공하면, mypage로 보내줌
}

export default MintFunction;
