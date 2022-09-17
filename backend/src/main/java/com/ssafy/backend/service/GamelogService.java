package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Gamelog;
import com.ssafy.backend.db.repository.GameWordRepository;
import com.ssafy.backend.db.repository.GamelogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class GamelogService {
    @Autowired
    private GamelogRepository gamelogRepository;
    @Autowired
    private GameWordRepository gameWordRepository;

    @Transactional
    public Gamelog findGamelogByid(int id) {
        return gamelogRepository.findById(id);
    }


    @Transactional
    public int createGamelog(String userWalletAddress) {
        Gamelog gamelog = new Gamelog();
        gamelog.setId(0);
        gamelog.setEarnedTicket(0);

        // todo : 지갑 주소로 user 찾아서 넣어주기
//        User user = userRepository.findUserByUserWalletAddress(userWalletAddress);
//        gamelog.setUser(user);

        //단어 Idx 무작위로 뽑아오기
        List<Integer> wordIdxSet = new ArrayList<>();
        Random r = new Random();
        for (int i = 0; i < 20; i++) {
            while (true) {
                // 0~99 중 랜덤으로 한장 뽑는다.
                int thisNum = r.nextInt(100);
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
            // 0~4 중 랜덤으로 한장 뽑는다.
            int thisAnswer = r.nextInt(5);
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

    public void modifyGamelog(Gamelog gamelog) {
        gamelogRepository.save(gamelog);
    }
}
