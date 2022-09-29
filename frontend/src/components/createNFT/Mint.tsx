import React, { useEffect } from 'react';
import FormData from 'form-data';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createNFTActions, countLetter } from '../../_slice/CreateNFTSlice';
import { DiscomposeSentence } from '../../commons/HangulMaker/DiscomposeHangul';
import MintFunction from './MintFunction'


export default function Mint() {
    const NFTData: {
      walletAddress: string;
      videoBlob: Blob;
      filename: string;
      title: string;
      description: string;
      tag: string;
      formData: FormData,
    } = {
      walletAddress: useSelector((state: any) => state.user.currentUser.wallet_address),
      videoBlob: useSelector((state: any) => state.createNFT.NFTBlob),
      filename: useSelector((state: any) => state.areaSentence.value).filter((char:string) => char !== '\n').join(''),
      title: useSelector((state: any) => state.createNFT.title),
      description: useSelector((state: any) => state.createNFT.description),
      tag: useSelector((state: any) => state.createNFT.tag).join(' '),
      formData: new FormData(),
    };
    const checkLetterAPI: {
      walletAddress: string;
      hangul: string[];
    } = {
      walletAddress: NFTData.walletAddress,
      hangul: [''],
    };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 한글 문장 분해해서 store에 저장
  checkLetterAPI.hangul = DiscomposeSentence(NFTData.filename);
  dispatch(createNFTActions.checkLetterAPI(checkLetterAPI));

  useEffect(() => {
    // formData store에 저장
    dispatch(createNFTActions.mintingData(NFTData.formData));

    // countLetter -> createNFT -> exhaustNFT 순차 진행
    try {
        dispatch(countLetter(checkLetterAPI));
    } finally {
        navigate('/nftlist');
    }
  }, [NFTData.formData])


  return (
    <button type="button" onClick={() => MintFunction(NFTData)}>
      MINT
    </button>
  );
}