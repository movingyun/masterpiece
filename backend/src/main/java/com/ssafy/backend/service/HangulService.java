package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Hangul;

import java.util.List;

public interface HangulService {
    Hangul findHangulByid(int id);
    List<Integer> pickRandomConstant(int drawQuantity);
    List<Integer> pickRandomVowel(int drawQuantity);
}
