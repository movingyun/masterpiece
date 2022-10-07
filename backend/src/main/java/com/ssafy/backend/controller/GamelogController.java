package com.ssafy.backend.controller;

import com.ssafy.backend.db.entity.Gamelog;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.dto.GameDto;
import com.ssafy.backend.dto.UserSelectDto;
import com.ssafy.backend.service.GamelogService;
import com.ssafy.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Api(value = "게임로그 API", tags = {"GameLog"})
@RequiredArgsConstructor
@RequestMapping(value = "/api/game")
@Log4j2
@CrossOrigin("*")
public class GamelogController {

    @Autowired
    GamelogService gamelogService;
    @Autowired
    UserService userService;

    @ApiOperation(value = "게임로그 생성 및 반환")
    @PostMapping(value = "")
    public ResponseEntity<GameDto> create(@RequestBody Map<String, String> map){
        String userWalletAddress = map.get("userWalletAddress");
        log.info("# Create game, player : " + userWalletAddress);
        int gameId = gamelogService.createGamelog(userWalletAddress);
        Gamelog thisGamelog= gamelogService.findGamelogByid(gameId);
        GameDto game = gamelogService.createGame(thisGamelog, gameId);
        return new ResponseEntity<>(game, HttpStatus.OK);
    }


    @ApiOperation(value = "게임로그 수정")
    @PutMapping("/log")
    public ResponseEntity<String> gamelogModify(@RequestBody UserSelectDto userSelect){
        Gamelog gamelog = gamelogService.findGamelogByid(userSelect.getGameId());

        //게임로그 수정 및 맞힌 문제 수 반환
        int getTicket = gamelogService.modifyGamelog(userSelect);

        //게임에서 얻은 티켓만큼 userTicket올려주기
        User user = gamelog.getUser();
        userService.plusUserTickets(user, getTicket);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

}
