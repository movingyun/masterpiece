import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, Button, Container } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  fetchCollected,
  fetchCreated,
  fetchFavorite,
  fetchInventory,
  fetchOnsale,
  Hangul,
} from '../../_slice/UserSlice';
import { NFT } from '../../_slice/NFTSlice';
import NFTCard from '../../commons/NFTCard';
import { UserInfoType } from './UserInfo';
import LetterCard from '../../commons/LetterCard';
import { ConsonantOrder, VowelOrder } from '../../_store/store';
import Information from '../../commons/Information';
import { tabButtonStyle, selectTabButtonStyle } from '../../_css/ReactCSSProperties';

const StyledCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > * {
    width: 290px;
    margin: 2px;
  }
`;

const StyledNFTList = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, minmax(277px, auto));
  > * {
    text-decoration: none;
  }
`;

export default function UserCardList({ walletAddress }: UserInfoType) {
  const dispatch = useDispatch();

  const [showArr, setShowArr] = useState<NFT[]>([]);
  const [label, setLabel] = useState<String>('collected');

  const handleClick = (arr: Array<NFT>, Lable: String) => {
    if (Lable !== 'inventory') {
      setShowArr(arr);
    }
    setLabel(Lable);
  };

  const collected = useSelector((state: any) => state.user.collected);
  const created = useSelector((state: any) => state.user.created);
  const onsale = useSelector((state: any) => state.user.onsale);
  const favorite = useSelector((state: any) => state.user.favorite);
  const inventory = useSelector((state: any) => state.user.inventory);

  useEffect(() => {
    if (walletAddress) {
      dispatch(fetchCollected(walletAddress));
      dispatch(fetchCreated(walletAddress));
      dispatch(fetchFavorite(walletAddress));
      dispatch(fetchOnsale(walletAddress));
      dispatch(fetchInventory(walletAddress));
    }
  }, [walletAddress]);

  useEffect(() => {
    setShowArr(collected);
  }, [collected]);

  return (
    <>
      {/* <div>collected</div> */}
      <ButtonGroup variant="contained" aria-label="text primary button group" fullWidth sx={{ margin: '10px 0' }}>
        <Button
          style={label === 'collected' ? { ...selectTabButtonStyle } : { ...tabButtonStyle }}
          onClick={() => handleClick(collected, 'collected')}>
          Collected
        </Button>
        <Button
          style={label === 'created' ? { ...selectTabButtonStyle } : { ...tabButtonStyle }}
          onClick={() => handleClick(created, 'created')}>
          Created
        </Button>
        <Button
          style={label === 'onsale' ? { ...selectTabButtonStyle } : { ...tabButtonStyle }}
          onClick={() => handleClick(onsale, 'onsale')}>
          Onsale
        </Button>
        <Button
          style={label === 'favorite' ? { ...selectTabButtonStyle } : { ...tabButtonStyle }}
          onClick={() => handleClick(favorite, 'favorite')}>
          Favorite
        </Button>
        <Button
          style={label === 'inventory' ? { ...selectTabButtonStyle } : { ...tabButtonStyle }}
          onClick={() => handleClick([], 'inventory')}>
          Inventory
        </Button>
      </ButtonGroup>
      {label === 'inventory' ? (
        <StyledCardList>
          {Object.values<Array<Hangul>>(inventory).map((one: Array<Hangul>, idx: Number) =>
            one.map((hangul: Hangul, index) =>
              hangul.quantity > 0 ? (
                hangul.hangulId <= 30 ? (
                  <Container
                    style={{
                      paddingTop: 15,
                      paddingBottom: 0,
                      paddingLeft: 15,
                      paddingRight: 0,
                      marginBottom: 100,
                      position: 'relative',
                      background: 'black',
                      height: 330,
                      width: 280,
                    }}
                    key={'inventory' + `${idx}` + `${index}`}>
                    <Information
                      content=""
                      height={380}
                      lineHeight={1}
                      title={
                        <LetterCard
                          margin
                          description={hangul.description}
                          title={hangul.title}
                          letter={`${ConsonantOrder[index]}`}
                          quantity={hangul.quantity}
                        />
                      }
                    />
                  </Container>
                ) : (
                  <Container
                    style={{
                      paddingTop: 15,
                      paddingBottom: 0,
                      paddingLeft: 15,
                      paddingRight: 0,
                      marginBottom: 100,
                      position: 'relative',
                      background: 'black',
                      height: 330,
                      width: 280,
                    }}
                    key={'inventory' + `${idx}` + `${index}`}>
                    <Information
                      content=""
                      height={380}
                      lineHeight={1}
                      title={
                        <LetterCard
                          margin
                          description={hangul.description}
                          title={hangul.title}
                          letter={VowelOrder[index]}
                          quantity={hangul.quantity}
                        />
                      }
                    />
                  </Container>
                )
              ) : null
            )
          )}
        </StyledCardList>
      ) : (
        <StyledNFTList>
          {showArr.map((NFTInfo: NFT, idx: Number) => (
            <Link to={`/nftdetail/${NFTInfo.nftAddress}`} key={`${idx}` + NFTInfo.imgUrl}>
              <Container
                style={{
                  paddingTop: 15,
                  paddingBottom: 0,
                  paddingLeft: 15,
                  paddingRight: 0,
                  marginBottom: 100,
                  position: 'relative',
                  background: 'black',
                  height: 300,
                }}>
                <Information
                  content=""
                  height={350}
                  title={
                    <NFTCard
                      imgUrl={NFTInfo.imgUrl}
                      nftTitle={NFTInfo.nftTitle}
                      nftPrice={NFTInfo.nftPrice}
                      nftCreatorNickname={NFTInfo.nftCreatorNickname}
                      lastPrice={NFTInfo.lastPrice}
                      nftOwnerNickname={NFTInfo.nftOwnerNickname}
                      nftTags={NFTInfo.nftTags}
                      nftLike={NFTInfo.nftLike}
                      nftAddress={NFTInfo.nftAddress}
                      nftDescription={NFTInfo.nftDescription}
                      tokenId={NFTInfo.tokenId}
                      isSale={NFTInfo.isSale}
                    />
                  }
                />
              </Container>
            </Link>
          ))}
        </StyledNFTList>
      )}
    </>
  );
}
