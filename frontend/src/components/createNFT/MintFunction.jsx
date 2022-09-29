import axios from 'axios';
import FormData from 'form-data';
import Web3 from 'web3';

import MasterpieceNFT from '../../json/MasterpieceNFT.json'

function MintFunction(NFTData) {


  const { walletAddress, videoBlob, title, description, tag } = NFTData;

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
  console.log(videoBlob);
  const readableStreamForFile = file.stream();

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

  let cid;
  let jsonCid;

  // Minting
  const mintNFT = async () => {
    const userAddress = walletAddress; // 로그인한 사용자의 지갑 주소
    const tokenURI = GATEWAY_URL + jsonCid;

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(ABI, CA);

    // minting
    const res = await contract.methods
      .create(userAddress, tokenURI)
      .send({
        from: userAddress,
      });

    const txHash = res.transactionHash;
    const { topics } = res.logs[0];
    const tokenId = parseInt(topics[topics.length - 1], 16);
    console.log("The hash of your transaction is: ", txHash);
    console.log("tokenId: ", tokenId);

    const formData = new FormData();
    formData.append('imgFile', file);
    formData.append('cid', cid);
    formData.append('tokenId', tokenId);
    formData.append('contractAddress', CA);
    formData.append('txHash', txHash);
    formData.append('creatorWalletAddress', userAddress);
    formData.append('nftTitle', title);
    formData.append('nftDescription', description);
    formData.append('nftTag', tag);

    NFTData.formData = formData;
  };

  // IPFS 업로드
  const sendJSONToIPFS = async () => {
    try {
      const data = JSON.stringify({
        "pinataOptions": {
          "cidVersion": 0
        },
        "pinataMetadata": {
          "name": title
        },
        "pinataContent": {
          "name": title,
          description,
          "image": GATEWAY_URL + cid,
        }
      });
      const res = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJsonToIPFS',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer PINATA JWT'
        },
        data,
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
        formData.append('file', readableStreamForFile);
        formData.append('pinataOptions', { "cidVersion": 0 });
        formData.append('pinataMetadata', { "name": file.name });
        // formData.append('name', filename);

        const res = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          headers: {
            'Authorization': 'Bearer PINATA JWT',
            ...formData.getHeaders()
          },
          data: formData,
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

  sendFileToIPFS();

  // 전부 성공하면, mypage로 보내줌
}

export default MintFunction;
