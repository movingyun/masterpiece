package com.ssafy.backend.controller;

import com.ssafy.backend.db.entity.Gamelog;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.dto.GameDto;
import com.ssafy.backend.dto.QuestionDto;
import com.ssafy.backend.dto.UserSelectDto;
import com.ssafy.backend.service.GamelogService;
import com.ssafy.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.hibernate.annotations.common.util.impl.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@Api(value = "게임로그 API", tags = {"GameLog"})
@RequiredArgsConstructor
@RequestMapping(value = "/api/game")
@Log4j2
public class GamelogController {

    @Autowired
    GamelogService gamelogService;
    @Autowired
    UserService userService;

    @ApiOperation(value = "게임로그 생성 및 반환")
    @PostMapping(value = "")
    public ResponseEntity<GameDto> create(@RequestBody String userWalletAddress){
        log.info("# Create game, player : " + userWalletAddress);
        int gameId = gamelogService.createGamelog(userWalletAddress);

        Gamelog thisGamelog= gamelogService.findGamelogByid(gameId);
        GameDto game = new GameDto();
        //gameId 넣기
        game.setGameId(gameId);

        //game 보기 넣기(20개)
        String questionOption = thisGamelog.getQuestionOption();
        String[] optionsArr = questionOption.split(",");
        List<QuestionDto> gameOption = new ArrayList<>();

        for(int j=0; j<5; j++){
            List<String> optionList = new ArrayList<>();
            QuestionDto question = new QuestionDto();
            for(int i=0; i<4; i++){
                optionList.add(optionsArr[(j*4)+i]);
            }
            question.setOptions(optionList);
            gameOption.add(question);
        }
        game.setQuestionOption(gameOption);

        //game 정답 넣기
        String questionAnswer = thisGamelog.getQuestionAnswer();
        String[] answersArr = questionAnswer.split(",");
        List<Integer> answer = new ArrayList<>();
        for(int i=0; i<5; i++){
           answer.add(Integer.parseInt(answersArr[i]));
        }
        game.setQuestionAnswer(answer);
        return new ResponseEntity<>(game, HttpStatus.OK);
    }


    @ApiOperation(value = "게임로그 수정")
    @PutMapping("/log")
    public ResponseEntity<String> gamelogModify(@RequestBody UserSelectDto userSelect){
        Gamelog gamelog = gamelogService.findGamelogByid(userSelect.getGameId());
        User user = gamelog.getUser();
        String select = "";
        String answer = gamelog.getQuestionAnswer();
        String[] answersArr = answer.split(",");
        //티켓 획득 수 = 정답 수
        int getTicket = 0;
        for(int i=0; i<5; i++){
            if(userSelect.getUserSelect()[i]==Integer.parseInt(answersArr[i])){
                getTicket++;
            }
            select += userSelect.getUserSelect()[i];
            if(i!=4)
                select += ",";
        }
        gamelog.setUserSelect(select);
        gamelog.setEarnedTicket(getTicket);

        gamelogService.modifyGamelog(gamelog);

        //게임에서 얻은 티켓만큼 userTicket올려주기
        userService.plusUserTickets(user, getTicket);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

}
