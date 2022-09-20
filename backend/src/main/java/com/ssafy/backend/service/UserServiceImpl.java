package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.repository.UserRepository;
import com.ssafy.backend.dto.UserSigninDto;
import com.ssafy.backend.dto.UserUpdateDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    AwsS3Service awsS3Service;

    @Override
    public UserSigninDto signin(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        //회원가입 진행
        if(user == null){
            LocalDateTime now = LocalDateTime.now();
            Instant instant = now.atZone(ZoneId.systemDefault()).toInstant();
            user = User.builder()
                    .walletAddress(wallet_address)
                    .userNickname("unnamed")
                    .message("Welcome to my NFT world!")
                    .joinDate(Date.from(instant))
                    .ticketCount(10) //초기 티켓 수: 10개
                    .build();
            userRepository.save(user);
        }

        return UserSigninDto.builder()
                .wallet_address(user.getWalletAddress())
                .nickname(user.getUserNickname())
                .message(user.getMessage())
                .joinDate(user.getJoinDate().toString())
                .ticketCount(user.getTicketCount())
                .profileImage(user.getProfileImg())
                .build();
    }

    @Override
    public UserSigninDto getUserInfo(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException("No such user");
        }

        return UserSigninDto.builder()
                .wallet_address(user.getWalletAddress())
                .nickname(user.getUserNickname())
                .message(user.getMessage())
                .joinDate(user.getJoinDate().toString())
                .ticketCount(user.getTicketCount())
                .profileImage(user.getProfileImg())
                .build();
    }

    @Override
    @Transactional
    public void updateUserInfo(UserUpdateDto dto) {
        User user = userRepository.findByWalletAddress(dto.getWallet_address()).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException("No such user");
        }

        MultipartFile file = dto.getProfileImage();
        awsS3Service.uploadProfileImage(user, file);
        user.updateUser(dto);
    }

    @Override
    public int getTicketCount(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }

        return user.getTicketCount();
    }

    @Override
    public Map<String, Integer> getUserHangul(String wallet_address) {
        Map<String, Integer> resMap = new HashMap<>();


        return resMap;
    }
}
