package com.ssafy.backend.service;

import com.ssafy.backend.dto.LikeDto;

public interface UserLikeService {
    void clickBoardLikes(LikeDto like);
}
