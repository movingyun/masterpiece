package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.HangulOwn;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.repository.HangulOwnRepository;
import com.ssafy.backend.db.repository.HangulRepository;
import com.ssafy.backend.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HangulOwnServiceImpl implements HangulOwnService{
    @Autowired
    private HangulOwnRepository hangulOwnRepository;
    @Autowired
    private HangulRepository hangulRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional
    @Override
    public HangulOwn findHangulOwnByUserAndHangulId(int userId, int hangulId) {
        return hangulOwnRepository.findByUserAndHangulId(userId,hangulId);
    }

    //사용자 가입시 hangulOwn 만들어주기(1~51번까지)
    @Transactional
    @Override
    public void createUserHangle(String wallet_address) {
        System.out.println("wallet_address : " + wallet_address);
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        for(int i=1; i<52; i++){
            HangulOwn hangulOwn = HangulOwn.builder()
                    .id(0)
                    .hangulCount(3) //처음 3개씩 지급
                    .hangul(hangulRepository.findByHangulId(i))
                    .user(user)
                    .build();
            hangulOwnRepository.save(hangulOwn);
        }
    }

    //hangulOwn 늘려주기
    @Transactional
    @Override
    public void plusUserHangle(int userId, int hangulId) {
        HangulOwn hangulOwn = findHangulOwnByUserAndHangulId(userId, hangulId);
        System.out.println("이거 올려줄꺼야 : " + hangulOwn.getHangul());
        hangulOwn.setHangulCount(hangulOwn.getHangulCount()+1);
        hangulOwnRepository.save(hangulOwn);
    }

    //hangulOwn 줄이기
    @Transactional
    @Override
    public void minusUserHangle(int userId, int hangulId) {
        HangulOwn hangulOwn = findHangulOwnByUserAndHangulId(userId, hangulId);
        hangulOwn.setHangulCount(hangulOwn.getHangulCount()-1);
        hangulOwnRepository.save(hangulOwn);
    }
}
