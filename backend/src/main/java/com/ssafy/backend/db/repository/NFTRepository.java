package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.Nft;
import com.ssafy.backend.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface NFTRepository extends JpaRepository<Nft, Integer> {
    Nft findById(int id);
    Nft findByContractAddress(String contract_address);
    @Query("select n from Nft n where n.owner = :user")
    List<Nft> findOwnedNfts(User user);
    @Query("select n from Nft n where n.creator = :user")
    List<Nft> findCreatedNfts(User user);
    @Query("select n from Nft n where n.owner = :user and n.isSale = true")
    List<Nft> findOnSaleNfts(User user);
    @Query("select u.nft from UserLike u where u.user = :user")
    List<Nft> findLikedNfts(User user);
}
