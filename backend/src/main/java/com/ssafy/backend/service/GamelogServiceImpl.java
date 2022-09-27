package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Gamelog;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.repository.GameWordRepository;
import com.ssafy.backend.db.repository.GamelogRepository;
import com.ssafy.backend.dto.GameDto;
import com.ssafy.backend.dto.QuestionDto;
import com.ssafy.backend.dto.UserSelectDto;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@Log4j2
public class GamelogServiceImpl implements GamelogService{

    @Autowired
    private GamelogRepository gamelogRepository;
    @Autowired
    private GameWordRepository gameWordRepository;
    @Autowired
    private UserService userService;

    @Transactional
    @Override
    public Gamelog findGamelogByid(int id) {
        return gamelogRepository.findById(id);
    }

    @Transactional
    @Override
    public GameDto createGame(Gamelog thisGamelog, int gameId) {
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
        return game;
    }


    @Transactional
    @Override
    public int createGamelog(String userWalletAddress) {
        Gamelog gamelog = new Gamelog();
        gamelog.setId(0);
        gamelog.setEarnedTicket(0);

        // userWalletAddress로 user정보 가져오기
        User user = userService.findByUserWalletAddress(userWalletAddress);
        System.out.println(user.getId()+"번 사람이 게임 시작");
        gamelog.setUser(user);

        //단어 Idx 무작위로 뽑아오기
        List<Integer> wordIdxSet = new ArrayList<>();
        Random r = new Random();
        for (int i = 0; i < 20; i++) {
            while (true) {
                // 1~99 중 랜덤으로 한장 뽑는다.
                int thisNum = r.nextInt(119)+1;
                // 새로운 번호면 wordIdxSet에 넣고 다음번호 뽑는다.
                if (!wordIdxSet.contains(thisNum)) {
                    wordIdxSet.add(thisNum);
                    break;
                }
            }
        }
        String questionOption="";
        // 단어Idx로 단어 뽑아오기
        for(int i=0; i<20; i++){
            String word = gameWordRepository.findByWordId(wordIdxSet.get(i)).getWord();
            questionOption+=(word);
            if(i!=19)
                questionOption+=(",");
        }
        //db에 단어 넣기
        gamelog.setQuestionOption(questionOption);

        // 정답 무작위로 뽑기
        List<Integer> answerSet = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            // 0~3 중 랜덤으로 한장 뽑는다.
            int thisAnswer = r.nextInt(4);
            // 새로운 번호면 wordIdxSet에 넣고 다음번호 뽑는다.
            answerSet.add(thisAnswer);
        }

        String questionAnswer="";
        for(int i=0; i<5; i++){
            String answer = String.valueOf(answerSet.get(i));
            questionAnswer+=(answer);
            if(i!=4)
                questionAnswer+=(",");
        }
        //db에 정답 넣기
        gamelog.setQuestionAnswer(questionAnswer);

        gamelogRepository.save(gamelog);

        //방금 만들어진 gamelog id를 넘겨준다.
        return gamelogRepository.findTopByOrderByIdDesc().getId();
    }



    @Transactional
    @Override
    //티켓 얼마나 벌었는지 반환
    public int modifyGamelog(UserSelectDto userSelect) {
        Gamelog gamelog = findGamelogByid(userSelect.getGameId());

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

        gamelogRepository.save(gamelog);

        return getTicket;
    }
}
