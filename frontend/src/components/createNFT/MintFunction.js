import axios from 'axios';
import FormData from 'form-data';
import Web3 from 'web3';

import api from '../../api/api';
import MasterpieceNFT from '../../json/MasterpieceNFT.json'

function blobToFile(theBlob, fileName) {
  return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: 'video/webm' });
}

async function MintFunction(NFTData, checkLetterAPI) {
  const { videoBlob, title, description, tag } = NFTData;

  /**
   * pinFileToIPFS -> pinJSONToIPFS -> NFT 민팅 -> nft생성 api 호출
   */


  const CA = process.env.REACT_APP_CONTRACT_ADDRESS;
  const ABI = MasterpieceNFT.abi;

  const GATEWAY_URL = 'https://ipfs.io/ipfs/';

  const file = videoBlob; // 민팅할 파일
  let cid;
  let jsonCid;

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

    console.log(blobToFile(file, title));

    formData.append('imgFile', blobToFile(file, title));
    formData.append('cid', cid);
    formData.append('tokenId', tokenId);
    formData.append('contractAddress', CA);
    formData.append('txHash', txHash);
    formData.append('creatorWalletAddress', userAddress);
    formData.append('nftTitle', title);
    formData.append('nftDescription', description);
    formData.append('nftTag', tag);

    NFTData.formData = formData;
    
    // countLetter -> MintFunction -> createNFT -> exhaustNFT 순차 진행
    const resCreateNFT = await axios.post(api.createNFT(), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    if (resCreateNFT.status === 200) {
      const resExhaustLetter = await axios.put(api.exhaustLetter(), checkLetterAPI, {});
      
      if(resExhaustLetter.status === 200) {
        NFTData.mintingCompleted = true;
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
  const res = await axios.post(api.countLetter(), checkLetterAPI, {});

  if(res.data === true) {
    sendFileToIPFS();
  }


  // 시작 전에 ipfs 업로드 중 표시 필요
}

export default MintFunction;
