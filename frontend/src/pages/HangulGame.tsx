import React from 'react';
import { Link } from 'react-router-dom';
import GameMain from '../components/hangulGame/GameMain';
import GameModal from '../components/hangulGame/GameModal';

export default function HangulGame() {
  return (
    <>
      <GameModal />
      <GameMain />
    </>
  );
}
