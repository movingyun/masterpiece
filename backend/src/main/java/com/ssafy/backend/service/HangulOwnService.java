package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Hangul;
import com.ssafy.backend.db.entity.HangulOwn;
import com.ssafy.backend.db.repository.HangulOwnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HangulOwnService {
    @Autowired
    private HangulOwnRepository hangulOwnRepository;

    @Transactional
    public HangulOwn findHangulOwnByUserAndHangulId(int userId, int hangulId) {
        return hangulOwnRepository.findByUserAndHangulId(userId,hangulId);
    }

    //hangulOwn 늘려주기
    @Transactional
    public void plusUserHangle(int userId, int hangulId) {
        HangulOwn hangulOwn = findHangulOwnByUserAndHangulId(userId, hangulId);
        hangulOwn.setHangulCount(hangulOwn.getHangulCount()+1);
        hangulOwnRepository.save(hangulOwn);
    }

    //hangulOwn 줄이기
    @Transactional
    public void minusUserHangle(int userId, int hangulId) {
        HangulOwn hangulOwn = findHangulOwnByUserAndHangulId(userId, hangulId);
        hangulOwn.setHangulCount(hangulOwn.getHangulCount()-1);
        hangulOwnRepository.save(hangulOwn);
    }
}
