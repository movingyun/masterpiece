import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, Card, CardContent } from '@mui/material';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { fetchLike, fetchNFTDetail, fetchNFTOwner, toggleLike } from '../../_slice/NFTSlice';
import { fetchSaleHistory } from '../../_slice/SaleSlice';
import SellModal from './SellModal';
import BuyModal from './BuyModal';
import NFTPreview from '../../commons/NFTPreview';

const StyledDetail = styled.div`
  display: flex;
  > * {
    margin: 2px;
  }
`;
const StyledChip = styled.div`
  display: flex;
  > * {
    margin: 2px;
  }
`;
const StyledBtn = styled.div`
  display: flex;
  > * {
    margin: 2px;
  }
`;
const StyledChart = styled.div`
  width: auto;
  height: 300px;
`;
const StyledLikeBtn = styled.button`
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  cursor: pointer;
`;

interface CurrentNftType {
  nftAddress: String;
}

export default function NftDetailInfo({ nftAddress }: CurrentNftType) {
  const dispatch = useDispatch();
  const currentNFT = useSelector((state: any) => state.nft.currentNFT);
  const nftOwnerWallet = useSelector((state: any) => state.nft.nftOwnerWallet);
  const saleHistoryAll = useSelector((state: any) => state.sale.saleHistoryAll);
  const walletAddress = useSelector((state: any) => state.user.currentUser.wallet_address);
  const likeState = useSelector((state: any) => state.nft.likeState);
  const isLoading = useSelector((state: any) => state.nft.isLoading);

  useEffect(() => {
    dispatch(fetchSaleHistory(nftAddress));
    dispatch(fetchNFTOwner(nftAddress));
  }, []);
  useEffect(() => {
    dispatch(fetchNFTDetail(nftAddress));
  }, [likeState]);

  useEffect(() => {
    if (walletAddress) {
      const likePayload = {
        userWalletAddress: walletAddress,
        nftHash: nftAddress,
      };
      dispatch(fetchLike(likePayload));
    }
  }, [!isLoading, walletAddress, likeState]);

  const handleClickLike = () => {
    const likePayload = {
      userWalletAddress: walletAddress,
      nftHash: nftAddress,
    };
    dispatch(toggleLike(likePayload));
  };

  return (
    <>
      <StyledDetail>
        <Card sx={{ width: '30%', minWidth: 200 }}>
          <NFTPreview url={`${currentNFT.imgUrl}`} />
        </Card>
        <Card sx={{ width: '70%' }}>
          <CardContent>
            <div>Creator : {currentNFT.nftCreatorNickname}</div>
            <div>Title : {currentNFT.nftTitle}</div>
            <div>Owner : {currentNFT.nftOwnerNickname}</div>
            <div>Price : {currentNFT.nftPrice}</div>
            <div>lastPrice : {currentNFT.lastPrice}</div>
            <StyledChip>
              {currentNFT.nftTags.map((tag: String, idx: Number) => (
                <Chip key={`${idx}` + `${currentNFT.imgUrl}`} label={tag} size="small" color="primary" />
              ))}
            </StyledChip>
            <StyledBtn>
              {nftOwnerWallet === walletAddress ? <SellModal /> : <BuyModal />}
              {likeState ? (
                <StyledLikeBtn onClick={handleClickLike}>
                  <FavoriteIcon />
                </StyledLikeBtn>
              ) : (
                <StyledLikeBtn onClick={handleClickLike}>
                  <FavoriteBorderIcon />
                </StyledLikeBtn>
              )}
              <div>nftLike {currentNFT.nftLike}</div>
            </StyledBtn>
          </CardContent>
        </Card>
      </StyledDetail>

      {/* 설명 */}
      <Card>
        <CardContent>
          <div>Description</div>
          <div>{currentNFT.nftDescription}</div>
        </CardContent>
      </Card>

      {/* 가격 차트 */}
      <Card>
        <CardContent>
          <div>Price</div>
          <StyledChart>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={saleHistoryAll}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="datetime" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </StyledChart>
        </CardContent>
      </Card>
    </>
  );
}
