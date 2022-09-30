package com.ssafy.backend.controller;

import com.ssafy.backend.dto.LikeDto;
import com.ssafy.backend.service.UserLikeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(value = "좋아요 API", tags = {"Like"})
@RequiredArgsConstructor
@RequestMapping(value = "/api/like")
@Log4j2
@CrossOrigin("*")
public class UserLikeController {

    @Autowired
    UserLikeService userLikeService;

    @PutMapping("")
    @ApiOperation(value = "좋아요 생성 및 변환", notes = "게시물에 대한 좋아요를 생성 및 변환한다.")
    public ResponseEntity<String> nftLike(@RequestBody LikeDto like) {
        userLikeService.clickBoardLikes(like);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @PostMapping("")
    @ApiOperation(value = "좋아요눌렀는지 확인", notes = "좋아요눌렀는지 확인")
    public ResponseEntity<Boolean> nftIsLike(@RequestBody LikeDto like) {
        boolean flag = userLikeService.isLike(like);
        return new ResponseEntity<>(flag, HttpStatus.OK);
    }

}
