package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.dto.UserSigninDto;
import com.ssafy.backend.dto.UserUpdateDto;

public interface UserService {
//    void register(UserSignupDto dto);
    UserSigninDto signin(String wallet_address);
    UserSigninDto getUserInfo(String wallet_address);
    void updateUserInfo(UserUpdateDto dto);
    User findByUserWalletAddress(String walletAddress);
    void minusUserTickets(User user, int drawQuantity);
    void plusUserTickets(User user, int drawQuantity);
}
