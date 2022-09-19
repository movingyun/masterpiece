package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.Gamelog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GamelogRepository extends JpaRepository<Gamelog, Integer> {
    //방금 만들어진 게임을 가져온다.
    Gamelog findTopByOrderByIdDesc();

    Gamelog findById(int id);
}
