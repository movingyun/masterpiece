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
    formData: FormData,
    formDataUploaded: boolean,
  } = {
    walletAddress: useSelector((state: any) => state.user.currentUser.wallet_address),
    videoBlob: useSelector((state: any) => state.createNFT.NFTBlob),
    filename: useSelector((state: any) => state.areaSentence.value).filter((char:string) => char !== '\n').join(''),
    title: useSelector((state: any) => state.createNFT.title),
    description: useSelector((state: any) => state.createNFT.description),
    tag: useSelector((state: any) => state.createNFT.tag).join(' '),
    formData: new FormData(),
    formDataUploaded: false,
  };
  const checkLetterAPI: {
    walletAddress: string;
    hangul: string[];
  } = {
    walletAddress: NFTData.walletAddress,
    hangul: [''],
  };
  
  
  // 한글 문장 분해해서 store에 저장
  checkLetterAPI.hangul = DiscomposeSentence(NFTData.filename);
  dispatch(createNFTActions.checkLetterAPI(checkLetterAPI));
  
  
  // countLetter -> MintFunction -> createNFT -> exhaustNFT 순차 진행
  function countLetterHandler() {
    dispatch(countLetter(checkLetterAPI));
  }

  useEffect(() => {


  }, [countLetterChecked])

  useEffect(() => {
    // formDataUpload가 안 되었거나 counterLetterChecked 가 안 됐으면 돌지 않음
    if (!countLetterChecked) return;
    // if(!NFTData.formDataUploaded) return;

    // // formData store에 저장
    // dispatch(createNFTActions.mintingData(NFTData.formData));


    // createNFT 돌리고
    createNFT(NFTData.formData);

  }, [NFTData.formData, NFTData.formDataUploaded, countLetterChecked, dispatch])

  useEffect(() => {
    // createNFT 성공한 뒤 exhaustNFT 까지 성공하면 /nftlist로 보내줌
    if(mintingCompleted) {
      navigate('/nftlist')
    }
  }, [mintingCompleted])

  return (
    <button type="button" onClick={countLetterHandler}>
      MINT
    </button>
  );
}