package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.HangulOwn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HangulOwnRepository extends JpaRepository<HangulOwn, Integer>{
    @Query(value = "SELECT * FROM hangul_own WHERE user_id =? AND hangul_id=?", nativeQuery = true)
    HangulOwn findByUserAndHangulId(int userId, int hangulId);
}
