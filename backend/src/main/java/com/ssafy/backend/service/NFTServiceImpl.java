package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Nft;
import com.ssafy.backend.db.repository.NFTRepository;
import com.ssafy.backend.dto.SaleResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NFTServiceImpl implements NFTService{

    @Autowired
    private NFTRepository nftRepository;
    @Autowired
    private UserService userService;


    @Override
    public Nft findById(int id) {
        return nftRepository.findById(id);
    }

    @Override
    public Nft findBycontractAddress(String contract_address) {
        return nftRepository.findByContractAddress(contract_address);
    }

    @Override
    public void modifyNftOwner(SaleResultDto saleResultDto) {
        int nftId = saleResultDto.getNftId();
        String buyerWallerAddress = saleResultDto.getBuyerWalletAddress();
        Nft nft = nftRepository.findById(nftId);
        nft.setOwner(userService.findByUserWalletAddress(buyerWallerAddress));
        nftRepository.save(nft);
    }


}
