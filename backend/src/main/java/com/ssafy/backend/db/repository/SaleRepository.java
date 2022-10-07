package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.Salelog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SaleRepository extends JpaRepository<Salelog, Integer> {
    @Query(value = "SELECT * FROM salelog WHERE nft_id =?", nativeQuery = true)
    List<Salelog> findAllByNftId(int ntf_id);
}
