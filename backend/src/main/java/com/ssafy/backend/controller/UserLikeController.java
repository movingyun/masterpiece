package com.ssafy.backend.controller;

import com.ssafy.backend.dto.Like;
import com.ssafy.backend.service.userLikeServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(value = "좋아요 API", tags = {"Hangul"})
@RequiredArgsConstructor
@RequestMapping(value = "/api/like")
@Log4j2
public class UserLikeController {

    @PutMapping("")
    @ApiOperation(value = "좋아요 생성 및 변환", notes = "게시물에 대한 좋아요를 생성 및 변환한다.")
    public void nftLike(@RequestBody Like like) {
        userLikeServiceImpl.clickBoardLikes(like);
    }

}
