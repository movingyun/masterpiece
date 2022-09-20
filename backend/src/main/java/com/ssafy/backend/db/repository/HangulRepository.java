package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.GameWord;
import com.ssafy.backend.db.entity.Hangul;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HangulRepository extends JpaRepository<Hangul, Integer> {
    @Query(value = "SELECT * FROM hangul WHERE id =?", nativeQuery = true)
    Hangul findByHangulId(int id);
}
