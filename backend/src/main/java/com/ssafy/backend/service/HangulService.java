package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Hangul;
import com.ssafy.backend.db.entity.User;

import java.util.List;
import java.util.Map;

public interface HangulService {
    Hangul findHangulByid(int id);
    boolean checkUserTicket(User user, int drawQuantity);
    List<Hangul> pickRandomConstant(User user, int drawQuantity);
    List<Hangul> pickRandomVowel(User user, int drawQuantity);

    List<Integer> getFirstConsonantList(String wallet_address);
    List<Integer> getMiddleVowelList(String wallet_address);
    List<Integer> getLastConsonantList(String wallet_address);
    List<Integer> getConsonantList(String wallet_address);
    List<Integer> getConsonantList2(String wallet_address);
    Map<String, Integer> getFirstConsonantMap(String wallet_address);
    Map<String, Integer> getMiddleVowelMap(String wallet_address);
    Map<String, Integer> getLastConsonantMap(String wallet_address);
    Map<String, Integer> getConsonantMap(String wallet_address);
    List<Hangul> getFirstConsonantsInfo();
    List<Hangul> getMiddleVowelsInfo();
    List<Hangul> getLastConsonantsInfo();
}
