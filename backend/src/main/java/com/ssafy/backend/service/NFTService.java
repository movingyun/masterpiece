package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Nft;
import com.ssafy.backend.dto.NFTCreateDto;
import com.ssafy.backend.dto.NFTDto;
import com.ssafy.backend.dto.SaleResultDto;

import java.util.List;

public interface NFTService {
    Nft findById(int id);
    List<Nft> findBycontractAddress(String contractAddress);
    void modifyNftOwner(SaleResultDto saleResultDto);

    List<NFTDto> getCollectedNft(String wallet_address);
    List<NFTDto> getCreatedNft(String wallet_address);
    List<NFTDto> getOnSaleNft(String wallet_address);
    List<NFTDto> getLikedNft(String wallet_address);
    void postNFT(NFTCreateDto dto);
    void updatePossessed(String nftAddress);
    void updateOnSale(String nftAddress, String price);
    NFTDto getNFTDto(String nft_address);
    List<NFTDto> getAllNFT();
    List<NFTDto> searchByCategory(String category, String keyword);
    String getOwnerAddress(String nftHash);

    Nft findByNFTHash(String nftHash);
}
