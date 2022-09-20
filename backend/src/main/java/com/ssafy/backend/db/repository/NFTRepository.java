package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.Nft;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NFTRepository extends JpaRepository<Nft, Integer> {
    Nft findById(int id);
    Nft findByContractAddress(String contract_address);
}
