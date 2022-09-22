package com.ssafy.backend.service;

import com.ssafy.backend.dto.NFTCreateDto;
import com.ssafy.backend.dto.NFTDto;
import com.ssafy.backend.db.entity.Nft;
import com.ssafy.backend.dto.SaleResultDto;
import java.util.List;

public interface NFTService {
    Nft findById(int id);
    Nft findBycontractAddress(String contractAddress);
    void modifyNftOwner(SaleResultDto saleResultDto);

    List<NFTDto> getCollectedNft(String wallet_address);
    List<NFTDto> getCreatedNft(String wallet_address);
    List<NFTDto> getOnSaleNft(String wallet_address);
    List<NFTDto> getLikedNft(String wallet_address);
    void postNFT(NFTCreateDto dto);
    void updatePossessed(int nftId);
    void updateOnSale(int nftId, String price);
    List<NFTDto> getAllNFT();
    List<NFTDto> searchByCategory(String category, String keyword);
}
