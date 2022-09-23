package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Hangul;

import java.util.List;
import java.util.Map;

public interface HangulService {
    Hangul findHangulByid(int id);
    List<Integer> pickRandomConstant(int drawQuantity);
    List<Integer> pickRandomVowel(int drawQuantity);
    List<String> getFirstConsonants();
    List<String> getMiddleVowels();
    List<String> getLastConsonants();
    List<String> getAllConsonants();
    Map<String, Integer> getFirstConsonantMap();
}
