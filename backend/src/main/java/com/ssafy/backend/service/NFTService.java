package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Nft;
import com.ssafy.backend.dto.SaleResultDto;

public interface NFTService {
    Nft findById(int id);
    Nft findBycontractAddress(String contractAddress);
    void modifyNftOwner(SaleResultDto saleResultDto);
}
