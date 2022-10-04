package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByWalletAddress(String walletAddress);
    @Query("select u from User u where u.userNickname like concat('%',:userNickname, '%')")
    List<User> findByUserNickname(String userNickname);

    @Query("select u.walletAddress from User u, Nft n where n.nftHash = :nftHash and n.owner = u")
    String findOwnerAddressByNftHash(String nftHash);
}
