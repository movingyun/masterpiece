package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.dto.HangulInfoDto;
import com.ssafy.backend.dto.UserSigninDto;
import com.ssafy.backend.dto.UserUpdateDto;

import java.util.List;
import java.util.Map;

public interface UserService {
//    void register(UserSignupDto dto);
    UserSigninDto signin(String wallet_address);
    UserSigninDto getUserInfo(String wallet_address);
    void updateUserInfo(UserUpdateDto dto);
    int getTicketCount(String wallet_address);
    Map<String, Integer> getUserHangul(String wallet_address);
    List<HangulInfoDto> getUserConsonant(String wallet_address);
    List<HangulInfoDto> getUserVowel(String wallet_address);
    User findByUserWalletAddress(String walletAddress);
    void minusUserTickets(User user, int drawQuantity);
    void plusUserTickets(User user, int drawQuantity);
}
