package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.Hangul;
import com.ssafy.backend.db.entity.User;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.ssafy.backend.db.entity.GameWord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HangulRepository extends JpaRepository<Hangul, Integer> {
    @Query(value = "SELECT * FROM hangul WHERE id =?", nativeQuery = true)
    Hangul findByHangulId(int id);

    @Query("select h, ho from Hangul h, HangulOwn ho where ho.user = :user and ho.hangul = h")
    List<Object[]> findHangulOwnedByUser(User user);

    @Query("select ho.hangul, ho.hangulCount from HangulOwn ho " +
            "where ho.user = :user and (ho.hangul.isFirst = true or ho.hangul.isLast = true)")
    List<Object[]> findConsonantsOwnedByUser(User user);

    @Query("select ho.hangul, ho.hangulCount from HangulOwn ho " +
            "where ho.user = :user and ho.hangul.isMiddle = true")
    List<Object[]> findVowelsOwnedByUser(User user);
}
