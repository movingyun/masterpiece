package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Nft;
import com.ssafy.backend.db.entity.Salelog;
import com.ssafy.backend.db.repository.SaleRepository;
import com.ssafy.backend.dto.SaleResultDto;
import com.ssafy.backend.dto.SalelogDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class SaleServiceImpl implements SaleServcie {

    @Autowired
    NFTService nftService;
    @Autowired
    SaleRepository saleRepository;

    @Override
    public void createSaleLog(SaleResultDto saleResultDto) {
        String nftHash = saleResultDto.getNftHash();
        Nft nft = nftService.findByNFTHash(nftHash);
        String saleContractAddress = saleResultDto.getSaleContractAddress();
        String buyerWalletAddress = saleResultDto.getBuyerWalletAddress();
        LocalDateTime now = LocalDateTime.now();
        Instant instant = now.atZone(ZoneId.systemDefault()).toInstant();
        Salelog salelog = Salelog.builder()
                .nft(nft)
                .saleContractAddress(saleContractAddress)
                .sellerWalletAddress(nft.getOwner().getWalletAddress())
                .buyerWalletAddress(buyerWalletAddress)
                .date(Date.from(instant))
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
