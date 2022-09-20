package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.HangulOwn;

public interface HangulOwnService {
    HangulOwn findHangulOwnByUserAndHangulId(int userId, int hangulId);
    void plusUserHangle(int userId, int hangulId);
    void minusUserHangle(int userId, int hangulId);
    void createUserHangle(String wallet_address);
}
