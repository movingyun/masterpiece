package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Hangul;

import java.util.List;
import java.util.Map;

public interface HangulService {
    Hangul findHangulByid(int id);
    List<Integer> pickRandomConstant(int drawQuantity);
    List<Integer> pickRandomVowel(int drawQuantity);
    Map<String, Integer> getFirstConsonantMap(String wallet_address);
    Map<String, Integer> getMiddleVowelMap(String wallet_address);
    Map<String, Integer> getLastConsonantMap(String wallet_address);
    Map<String, Integer> getConsonantMap(String wallet_address);
}
