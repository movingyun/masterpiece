package com.ssafy.backend.service;

import com.ssafy.backend.dto.NFTDto;

import java.util.List;

public interface NFTService {
    List<NFTDto> getCollectedNft(String wallet_address);
    List<NFTDto> getCreatedNft(String wallet_address);
    List<NFTDto> getOnSaleNft(String wallet_address);
    List<NFTDto> getLikedNft(String wallet_address);
}
