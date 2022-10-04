package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.GameWord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GameWordRepository extends JpaRepository<GameWord, Integer> {
    @Query(value = "SELECT * FROM game_word WHERE id =?", nativeQuery = true)
    GameWord findByWordId(int id);
}
