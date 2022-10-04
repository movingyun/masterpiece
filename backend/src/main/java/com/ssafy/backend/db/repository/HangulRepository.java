package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.Hangul;
import com.ssafy.backend.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

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
    @Query("select ho.hangul, ho.hangulCount from HangulOwn ho " +
            "where ho.user = :user and ho.hangul.isFirst = true")
    List<Object[]> findFirstOwnedByUser(User user);
    @Query("select ho.hangul, ho.hangulCount from HangulOwn ho " +
            "where ho.user = :user and ho.hangul.isMiddle = true")
    List<Object[]> findMiddleOwnedByUser(User user);
    @Query("select ho.hangul, ho.hangulCount from HangulOwn ho " +
            "where ho.user = :user and ho.hangul.isLast = true")
    List<Object[]> findLastOwnedByUser(User user);

    @Query("select h.letter from Hangul h where h.isFirst = true")
    List<String> findAllFirstConsonant();
    @Query("select h.letter from Hangul h where h.isMiddle = true")
    List<String> findAllMiddleVowel();
    @Query("select h.letter from Hangul h where h.isLast = true")
    List<String> findAllLastConsonant();
    @Query("select h.letter from Hangul h where h.isFirst = true or h.isLast = true")
    List<String> findAllConsonant();

    @Query(value = "SELECT * FROM hangul WHERE is_first = true", nativeQuery = true)
    List<Hangul> findAllFirstConsonantInfo();
    @Query(value = "SELECT * FROM hangul WHERE is_middle = true", nativeQuery = true)
    List<Hangul> findAllMiddleVowelInfo();
    @Query(value = "SELECT * FROM hangul WHERE is_last = true", nativeQuery = true)
    List<Hangul> findAllLastConsonantInfo();
}
