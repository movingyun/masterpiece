package com.ssafy.backend.controller;

import com.ssafy.backend.db.entity.Gamelog;
import com.ssafy.backend.db.repository.GamelogRepository;
import com.ssafy.backend.dto.Game;
import com.ssafy.backend.dto.Question;
import com.ssafy.backend.dto.UserSelectParam;
import com.ssafy.backend.service.GamelogService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/game")
@Log4j2
public class GamelogController {

    @Autowired
    GamelogService gamelogService;

    //게임 생성 및 반환(Post, /)
    @ApiOperation(value = "게임로그 생성 및 반환")
    @PostMapping(value = "")
    public ResponseEntity<Game> create(@RequestBody String userWalletAddress){
        log.info("# Create game, player : " + userWalletAddress);
        int gameId = gamelogService.createGamelog(userWalletAddress);
        Gamelog thisGamelog= gamelogService.findGamelogByid(gameId);
        Game game = new Game();
        //gameId 넣기
        game.setGameId(gameId);

        //game 보기 넣기(20개)
        String questionOption = thisGamelog.getQuestionOption();
        String[] optionsArr = questionOption.split(",");
        List<Question> gameOption = new ArrayList<>();

        for(int j=0; j<5; j++){
            List<String> optionList = new ArrayList<>();
            Question question = new Question();
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
    public ResponseEntity<String> gamelogModify(@RequestBody UserSelectParam userSelectParam){
        Gamelog gamelog = gamelogService.findGamelogByid(userSelectParam.getGameId());
        String select = "";
        String answer = gamelog.getQuestionAnswer();
        String[] answersArr = answer.split(",");
        //티켓 획득 수 = 정답 수
        int getTicket = 0;
        for(int i=0; i<5; i++){
            if(userSelectParam.getUserSelect()[i]==Integer.parseInt(answersArr[i])){
                getTicket++;
            }
            select += userSelectParam.getUserSelect()[i];
            if(i!=4)
                select += ",";
        }
        gamelog.setUserSelect(select);
        gamelog.setEarnedTicket(getTicket);

        gamelogService.modifyGamelog(gamelog);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

}
