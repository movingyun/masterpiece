package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Hangul;
import com.ssafy.backend.db.repository.HangulRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class HangulServiceImpl implements HangulService {
    @Autowired
    private HangulRepository hangulRepository;

    @Transactional
    @Override
    public Hangul findHangulByid(int id) {
        return hangulRepository.findByHangulId(id);
    }

    //자음 랜덤 뽑기
    @Transactional
    @Override
    public List<Integer> pickRandomConstant(int drawQuantity) {
        List<Integer> constantIdSet = new ArrayList<>();
        Random r = new Random();
        for (int i = 0; i < drawQuantity; i++) {
            // 자음(1~30) 중 랜덤으로 한장 뽑는다.
            int thisConstantId = r.nextInt(30)+1;
            constantIdSet.add(thisConstantId);
        }
        return constantIdSet;
    }

    //모음 랜덤 뽑기
    @Transactional
    @Override
    public List<Integer> pickRandomVowel(int drawQuantity) {
        List<Integer> vowelIdSet = new ArrayList<>();
        Random r = new Random();
        for (int i = 0; i < drawQuantity; i++) {
            // 모음(31~51) 중 랜덤으로 한장 뽑는다.
            int thisVowelId = r.nextInt(21)+31;
            vowelIdSet.add(thisVowelId);
        }
        return vowelIdSet;
    }

    @Override
    public List<String> getFirstConsonants() {
        return hangulRepository.findAllFirstConsonant();
    }

    @Override
    public List<String> getMiddleVowels() {
        return hangulRepository.findAllMiddleVowel();
    }

    @Override
    public List<String> getLastConsonants() {
        return hangulRepository.findAllLastConsonant();
    }

    @Override
    public List<String> getAllConsonants() {
        return hangulRepository.findAllConsonant();
    }

    @Override
    public Map<String, Integer> getFirstConsonantMap() {
        return null;
    }

    @Override
    public List<Hangul> getFirstConsonantsInfo() {
        return hangulRepository.findAllFirstConsonantInfo();
    }

    @Override
    public List<Hangul> getMiddleVowelsInfo() {
        return hangulRepository.findAllMiddleVowelInfo();
    }

    @Override
    public List<Hangul> getLastConsonantsInfo() {
        return hangulRepository.findAllLastConsonantInfo();
    }
}
