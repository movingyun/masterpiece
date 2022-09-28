package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Nft;
import com.ssafy.backend.db.entity.Salelog;
import com.ssafy.backend.db.repository.SaleRepository;
import com.ssafy.backend.dto.SaleResultDto;
import com.ssafy.backend.dto.SalelogDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SaleServiceImpl implements SaleServcie {

    @Autowired
    NFTService nftService;
    @Autowired
    SaleRepository saleRepository;

    @Override
    public void createSaleLog(SaleResultDto saleResultDto) {
        int nftId = saleResultDto.getNftId();
        System.out.println("Impl로 넘어온 nftId : " + nftId);
        Nft nft = nftService.findById(nftId);
        String saleContractAddress = saleResultDto.getSaleContractAddress();
        String buyerWalletAddress = saleResultDto.getBuyerWalletAddress();
        Salelog salelog = Salelog.builder()
                .id(0)
                .nft(nft)
                .saleContractAddress(saleContractAddress)
                .sellerWalletAddress(nft.getOwner().getWalletAddress())
                .buyerWalletAddress(buyerWalletAddress)
                .price(nft.getPrice())
                .build();
        System.out.println("Impl에서 만든 saleLog : " + salelog.getBuyerWalletAddress());
        saleRepository.save(salelog);
    }

    @Override
    public List<SalelogDto> getSaleLog(String nftHash) {
        int nftId = nftService.findByNFTHash(nftHash).getId();
        List<Salelog> saleLogs = saleRepository.findAllByNftId(nftId);
        List<SalelogDto> salelogDtos = new ArrayList<>();
        for(Salelog salelog : saleLogs){
            SalelogDto salelogDto = SalelogDto.builder()
                    .sellerWalletAddress(salelog.getSellerWalletAddress())
                    .buyerWalletAddress(salelog.getBuyerWalletAddress())
                    .datetime(salelog.getDate())
                    .price(salelog.getPrice())
                    .build();
            salelogDtos.add(salelogDto);
        }
        return salelogDtos;
    }
}
