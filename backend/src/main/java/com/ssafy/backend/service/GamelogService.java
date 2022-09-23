package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Gamelog;
import com.ssafy.backend.dto.GameDto;
import com.ssafy.backend.dto.UserSelectDto;

public interface GamelogService {
    Gamelog findGamelogByid(int id);
    int createGamelog(String userWalletAddress);
    GameDto createGame(Gamelog thisGamelog, int gameId);
    int modifyGamelog(UserSelectDto userSelect);
}
