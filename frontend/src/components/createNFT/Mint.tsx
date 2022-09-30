import React, { useEffect } from 'react';
import FormData from 'form-data';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createNFTActions, countLetter, createNFT } from '../../_slice/CreateNFTSlice';
import { DiscomposeSentence } from '../../commons/HangulMaker/DiscomposeHangul';
import MintFunction from './MintFunction'


export default function Mint() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // countLetter가 확인되면 true로
  const countLetterChecked = useSelector((state: any) => state.createNFT.countLetterChecked);
  const mintingCompleted = useSelector((state: any) => state.createNFT.mintingCompleted);

  const NFTData: {
    walletAddress: string;
    videoBlob: Blob;
    filename: string;
    title: string;
    description: string;
    tag: string;
    formData: FormData;
    formDataUploaded: boolean;
  } = {
    walletAddress: useSelector((state: any) => state.user.currentUser.wallet_address),
    videoBlob: useSelector((state: any) => state.createNFT.NFTBlob),
    filename: useSelector((state: any) => state.areaSentence.value)
      .filter((char: string) => char !== '\n')
      .join(''),
    title: useSelector((state: any) => state.createNFT.title),
    description: useSelector((state: any) => state.createNFT.description),
    tag: useSelector((state: any) => state.createNFT.tag).join(' '),
    formData: new FormData(),
    formDataUploaded: false,
  };
  const checkLetterAPI: {
    userWalletAddress: string;
    hangul: string[];
  } = {
    userWalletAddress: NFTData.walletAddress,
    hangul: [''],
  };

  // 한글 문장 분해해서 store에 저장
  checkLetterAPI.hangul = DiscomposeSentence(NFTData.filename);
  dispatch(createNFTActions.checkLetterAPI(checkLetterAPI));

  // // countLetter -> MintFunction -> createNFT -> exhaustNFT 순차 진행
  // function countLetterHandler() {
  //   console.log("들어옴?")
  //   dispatch(countLetter(checkLetterAPI));
  // }

  // useEffect(() => {

  // }, [countLetterChecked])

  // useEffect(() => {
  //   // formDataUpload가 안 되었거나 counterLetterChecked 가 안 됐으면 돌지 않음
  //   if (!countLetterChecked) return;

  //   if(countLetterChecked && !NFTData.formDataUploaded) {
  //     console.log("Mintfunction")
  //     MintFunction();
  //   } else if (countLetterChecked && NFTData.formDataUploaded) {
  //     console.log("createNFT")
  //     // formData store에 저장
  //     dispatch(createNFTActions.mintingData(NFTData.formData));

  //     // createNFT 돌리고
  //     createNFT(NFTData.formData);

  //     // useEffect 돌지 않게 처리
  //     dispatch(createNFTActions.countLetterChecked(false));
  //   }
  // }, [NFTData.formDataUploaded, countLetterChecked, dispatch])

  useEffect(() => {
    // createNFT.fullfilled 이후 exhaustNFT 까지 fullfilled -> /nftlist로 보내줌
    if(mintingCompleted) {
      navigate('/nftlist')
    }
  }, [mintingCompleted])

  return (
    <button type="button" onClick={() => MintFunction(NFTData, checkLetterAPI)}>
      MINT
    </button>
  );
}