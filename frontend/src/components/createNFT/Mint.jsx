import React from 'react';
import dotenv from 'dotenv';
// import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import Web3 from 'web3';
import Contract from 'web3-eth-contract';
import pinataSDK from '@pinata/sdk';

import { useSelector, useDispatch } from 'react-redux';
import { createNFTActions, countLetter } from '../../_slice/CreateNFTSlice';


dotenv.config();

function Mint() {
  const dispatch = useDispatch();

  // NFT webm blob
  const videoBlob = useSelector(state => state.createNFT.NFTBlob);

  // 한글 문장 = filename
  const filename = useSelector(state => state.areaSentence.value).filter(char => char !== '\n').join('');

  // NFTInput
  const title = useSelector(state => state.createNFT.style);
  const description = useSelector(state => state.createNFT.style);
  const tag = useSelector(state => state.createNFT.style);

  /**
   * pinFileToIPFS -> pinJSONToIPFS -> NFT 민팅 -> nft생성 api 호출
   */

  const pinata = pinataSDK(process.env.REACT_APP_PINATA_API_KEY, process.env.REACT_APP_PINATA_API_SECRET_KEY);
  const CA = process.env.REACT_APP_CONTRACT_ADDRESS;
  const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  const web3 = new Web3('ws://20.196.209.2:6174');
  Contract.setProvider('ws://20.196.209.2:6174');
  const ABI = JSON.parse(fs.readFileSync('../smart-contracts/build/contracts/SsafyNFT.json')).abi;
  const contract = new Contract(ABI, CA);

  const GATEWAY_URL = 'https://ipfs.io/ipfs/';

  // const file = videoBlob; // 민팅할 파일
  const readableStreamForFile = videoBlob.stream();
  // fetch(file).then((response) => {
  //     readableStreamForFile = response.body;
  // });

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
  const options = {
    pinataMetadata: {
      name: filename,
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };
  const options2 = {
    pinataMetadata: {
      name: title,
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };

  // IPFS 업로드
  let cid;
  let jsonCid;
  pinata
    .pinFileToIPFS(readableStreamForFile, options)
    .then(result1 => {
      console.log(result1);
      cid = result1.IpfsHash;

      const body = {
        name: title,
        description,
        image: GATEWAY_URL + cid,
        attributes: [{ trait_type: 'Unknown', value: 'Unknown' }],
      };

      pinata
        .pinJSONToIPFS(body, options2)
        .then(result2 => {
          console.log(result2);
          jsonCid = result2.IpfsHash;
          const userAddress = '0x85e559f41A96e3bE80082c9b3bc2614BB249325F'; // 로그인한 사용자의 지갑 주소
          const tokenURI = GATEWAY_URL + jsonCid;

          web3.eth.getTransactionCount(userAddress, 'latest').then(res => {
            const nonce = res;
            console.log('nonce:' + nonce);

            const tx = {
              from: userAddress,
              to: CA,
              nonce,
              gas: 1000000000,
              data: contract.methods.create(userAddress, tokenURI).encodeABI(),
            };

            // NFT 민팅
            const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
            signPromise.then(signedTx => {
              web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, hash) => {
                if (!err) {
                  console.log('The hash of your transaction is: ', hash);
                  // nft 생성 api 호출
                  const formData = new FormData();
                  // formData.append("imgFile", file);
                  formData.append('cid', cid);
                  formData.append('contractAddress', CA);
                  formData.append('txHash', hash);
                  formData.append('creatorWalletAddress', userAddress);
                  formData.append('nftTitle', title);
                  formData.append('nftDescription', description);
                  formData.append('nftTag', tag);

                  // formData store에 저장
                  dispatch(createNFTActions.mintingData(formData));

                  // countLetter -> createNFT -> exhaustNFT 순차 진행
                  dispatch(countLetter(formData));

                  // axios는 redux 에서 처리
                  //   .post('http://localhost:8080/api/nft', formData, {
                  //     headers: { 'Content-Type': 'multipart/form-data' },
                  //   })
                  //   .then(() => {
                  //     console.log('success');
                  //   })
                  //   .catch(() => {
                  //     console.log('fail');
                  //   });
                } else {
                  console.log('Something went wrong when submitting your transaction:', err);
                }
              });
            });
          });
        })
        .catch(error => {
          console.log('pinJSONToIPFS error!');
          console.log(error);
        });
    })
    .catch(error => {
      console.log('pinFileToIPFS error!');
      console.log(error);
    });

  return <div>mint</div>;
}

export default Mint;
