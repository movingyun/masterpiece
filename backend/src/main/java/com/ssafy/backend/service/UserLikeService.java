package com.ssafy.backend.service;

import com.ssafy.backend.dto.LikeDto;
import org.springframework.transaction.annotation.Transactional;

public interface UserLikeService {
    void clickBoardLikes(LikeDto like);

    @Transactional
    boolean isLike(LikeDto like);
}
