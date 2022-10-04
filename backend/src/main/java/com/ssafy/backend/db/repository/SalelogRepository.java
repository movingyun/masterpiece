package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.Nft;
import com.ssafy.backend.db.entity.Salelog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalelogRepository extends JpaRepository<Salelog, Integer> {

    Salelog findFirstByNftOrderByDateDesc(Nft nft);
}
