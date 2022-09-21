package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Nft;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.repository.NFTRepository;
import com.ssafy.backend.db.repository.SalelogRepository;
import com.ssafy.backend.db.repository.UserLikeRepository;
import com.ssafy.backend.db.repository.UserRepository;
import com.ssafy.backend.dto.NFTDto;
import com.ssafy.backend.dto.SaleResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NFTServiceImpl implements NFTService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    NFTRepository nftRepository;
    @Autowired
    SalelogRepository salelogRepository;
    @Autowired
    UserLikeRepository userLikeRepository;
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

    @Override
    public List<NFTDto> getCollectedNft(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }

        List<Nft> nftList = nftRepository.findOwnedNfts(user);
        return makeNFTDtoList(nftList);
    }

    @Override
    public List<NFTDto> getCreatedNft(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }

        List<Nft> nftList = nftRepository.findCreatedNfts(user);
        return makeNFTDtoList(nftList);
    }

    @Override
    public List<NFTDto> getOnSaleNft(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }

        List<Nft> nftList = nftRepository.findOnSaleNfts(user);
        return makeNFTDtoList(nftList);
    }

    @Override
    public List<NFTDto> getLikedNft(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }

        List<Nft> nftList = nftRepository.findLikedNfts(user);
        return makeNFTDtoList(nftList);
    }

    private List<NFTDto> makeNFTDtoList(List<Nft> nftList){
        List<NFTDto> dtoList = new ArrayList<>();
        for(Nft nft : nftList){
            List<String> tagList = new ArrayList<>();
            String[] tags = nft.getNftTag().split(" ");
            for(int i=0; i<tags.length; i++){
                tagList.add(tags[i]);
            }

            int lastPrice = salelogRepository.findFirstByNftOrderByDateDesc(nft).getPrice();
            int likes = userLikeRepository.getLikeCountOfNft(nft);
            dtoList.add(buildNFTDto(nft, tagList, lastPrice, likes));
        }

        return dtoList;
    }
    private NFTDto buildNFTDto(Nft nft, List<String> tagList, int lastPrice, int likes){
        return NFTDto.builder()
                .imgUrl(nft.getImageUrl())
                .nftTitle(nft.getNftTitle())
                .nftPrice(nft.getPrice())
                .nftCreatorNickname(nft.getCreator().getUserNickname())
                .lastPrice(String.valueOf(lastPrice))
                .nftOwnerNickname(nft.getOwner().getUserNickname())
                .nftTags(tagList)
                .nftLike(likes)
                .build();
    }
}
