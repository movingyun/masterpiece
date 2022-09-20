package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Gamelog;

public interface GamelogService {
    Gamelog findGamelogByid(int id);
    int createGamelog(String userWalletAddress);
    void modifyGamelog(Gamelog gamelog);
}
