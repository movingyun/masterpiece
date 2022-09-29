import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { createNFTActions, countLetter } from '../../_slice/CreateNFTSlice';

import MintFunction from './MintFunction'

export default function Mint() {
    const NFTInfos = {};


    return <button type="button" onClick={() => MintFunction(NFTInfos)} >MINT</button>
}