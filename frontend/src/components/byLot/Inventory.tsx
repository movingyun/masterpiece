import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LetterCard from '../../commons/LetterCard';
import { fetchConsonant } from '../../_slice/HangulSlice';

export default function Inventory() {
  const dispatch = useDispatch();

  const walletAddress = useSelector((state: any) => state.user.currentUser.wallet_address);
  const consonant = useSelector((state: any) => state.hangul.consonant);

  useEffect(() => {
    dispatch(fetchConsonant(walletAddress));
  });

  return (
    <>
      <div>{walletAddress}</div>
      {consonant.map((one: number, idx: number) => (
        // 출력 테스트
        <LetterCard description="설명" title="제목" letter="ㄱ" quantity={one} />
      ))}
      <LetterCard description="설명" title="제목" letter="ㄱ" quantity={1} />
    </>
  );
}
