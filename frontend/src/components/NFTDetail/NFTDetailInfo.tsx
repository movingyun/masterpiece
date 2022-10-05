import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, Card, CardContent, Typography } from '@mui/material';
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
  margin: 10px 0;
  display: flex;
  > * {
    margin: 0 5px;
  }
`;
const StyledChip = styled.div`
  display: flex;
  > * {
    margin: 2px;
  }
  strong {
    font-weight: 700;
  }
`;


const StyledBtn = styled.div`
  display: flex;
  position: absolute;
  bottom: 20px;
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
  margin-left: 20px;
`;
const StyledInfo = styled.div`
  margin: 10px 0;
  > span {
    display: inline-block;
    margin-right: 20px;
  }
  strong {
    font-weight: 700;
  }
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
        <Card sx={{ width: '30%', minWidth: 200 }} variant="outlined">
          <NFTPreview url={`${currentNFT.imgUrl}`} />
        </Card>
        <Card sx={{ width: '70%', padding: '0 10px' }} variant="outlined">
          <CardContent sx={{ height: 'calc(100% - 32px)', position: 'relative' }}>
            <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 900 }}>
              {currentNFT.nftTitle}
            </Typography>
            <StyledInfo>
              <span>
                <strong>Creator : </strong>
                {currentNFT.nftCreatorNickname}
              </span>
              <span>
                <strong>Owner : </strong>
                {currentNFT.nftOwnerNickname}
              </span>
            </StyledInfo>
            <StyledInfo>
              <span>
                <strong>Price : </strong>
                {currentNFT.nftPrice}
              </span>
              <span>
                <strong>Last Price : </strong>
                {currentNFT.lastPrice}
              </span>
            </StyledInfo>
            <StyledChip>
              <span>
                <strong>Tags : </strong>
              </span>
              {currentNFT.nftTags.map((tag: String, idx: Number) => (
                <Chip
                  key={`${idx}` + `${currentNFT.imgUrl}`}
                  label={tag}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
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
              <div style={{ lineHeight: '33px' }}> {currentNFT.nftLike}</div>
            </StyledBtn>
          </CardContent>
        </Card>
      </StyledDetail>

      {/* 설명 */}
      <Card sx={{ margin: 1 }} variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Description
          </Typography>
          <div>{currentNFT.nftDescription}</div>
        </CardContent>
      </Card>

      {/* 가격 차트 */}
      <Card sx={{ margin: 1 }} variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Price
          </Typography>
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
                <Line type="monotone" dataKey="Price" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </StyledChart>
        </CardContent>
      </Card>
    </>
  );
}
