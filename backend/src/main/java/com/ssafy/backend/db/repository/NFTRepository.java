package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.Nft;
import com.ssafy.backend.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NFTRepository extends JpaRepository<Nft, Integer> {
    Nft findById(int id);
    List<Nft> findByContractAddress(String contract_address);
    List<Nft> findByNftHash(String nftHash);
    @Query("select n from Nft n where n.owner = :user")
    List<Nft> findOwnedNfts(User user);
    @Query("select n from Nft n where n.creator = :user")
    List<Nft> findCreatedNfts(User user);
    @Query("select n from Nft n where n.owner = :user and n.isSale = true")
    List<Nft> findOnSaleNfts(User user);
    @Query("select u.nft from UserLike u where u.user = :user and (u.isCancel is null or u.isCancel = false)")
    List<Nft> findLikedNfts(User user);
    @Query("select n from Nft n where n.isSale = true")
    List<Nft> findAllOnSale();
    @Query("select n from Nft n where n.creator = :user and n.isSale = true")
    List<Nft> findByCreator(User user);
    @Query("select n from Nft n where n.owner = :user and n.isSale = true")
    List<Nft> findByOwner(User user);
//    @Query("select n from Nft n where n.nftTag like concat('%',:keyword,'%')")
//    List<Nft> findByTag(String keyword);
    @Query("select n from Nft n where n.isSale = true and " +
            "(n.nftTitle like concat('%',:keyword,'%') or n.nftDescription like concat('%',:keyword,'%'))")
    List<Nft> findByTitleContent(String keyword);
}
