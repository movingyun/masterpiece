import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import styled from 'styled-components';
import LetterCard from '../../commons/LetterCard';
import { fetchInventory, Hangul } from '../../_slice/UserSlice';
import { ConsonantOrder, VowelOrder } from '../../_store/store';

const StyledCardList = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, minmax(277px, auto));
  > * {
    text-decoration: none;
  }
`;

export default function Inventory() {
  const dispatch = useDispatch();

  const walletAddress = useSelector((state: any) => state.user.currentUser.wallet_address);
  const inventory = useSelector((state: any) => state.user.inventory);

  useEffect(() => {
    if (walletAddress) dispatch(fetchInventory(walletAddress));
    console.log(inventory);
  }, [walletAddress]);

  return (
    <>
      <Typography gutterBottom variant="h4" component="div" sx={{ fontFamily: 'Poppins, san-serif' }}>
        Inventory
      </Typography>
      <StyledCardList>
        {Object.values<Array<Hangul>>(inventory).map((one: Array<Hangul>, idx: Number) =>
          one.map((hangul: Hangul, index) =>
            hangul.quantity > 0 ? (
              hangul.hangulId <= 30 ? (
                <LetterCard
                  description={hangul.description}
                  title={hangul.title}
                  letter={`${ConsonantOrder[index]}`}
                  quantity={hangul.quantity}
                  key={'inventory' + `${idx}` + `${index}`}
                />
              ) : (
                <LetterCard
                  description={hangul.description}
                  title={hangul.title}
                  letter={VowelOrder[index]}
                  quantity={hangul.quantity}
                  key={'inventory' + `${idx}` + `${index}`}
                />
              )
            ) : null
          )
        )}
      </StyledCardList>
    </>
  );
}
