package com.ssafy.backend.db.repository;

import com.ssafy.backend.db.entity.GameWord;
import com.ssafy.backend.db.entity.UserLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserLikeRepository extends JpaRepository<UserLike, Integer> {
    @Query(value = "SELECT * FROM user_like WHERE user_id =? AND nft_id =?", nativeQuery = true)
    UserLike findByUserAndNftId(int user_id, int nft_id);
}
