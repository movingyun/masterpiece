package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Nft;

public interface NFTService {
    Nft findById(int id);
    Nft findBycontractAddress(String contract_address);
}
