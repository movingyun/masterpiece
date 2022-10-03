package com.ssafy.backend.service;

import com.ssafy.backend.db.entity.Hangul;
import com.ssafy.backend.db.entity.HangulOwn;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.db.repository.HangulRepository;
import com.ssafy.backend.db.repository.UserRepository;
import com.ssafy.backend.dto.HangulInfoDto;
import com.ssafy.backend.dto.UserSigninDto;
import com.ssafy.backend.dto.UserUpdateDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    HangulRepository hangulRepository;
    @Autowired
    AwsS3Service awsS3Service;
    @Autowired
    HangulOwnService hangulOwnService;

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
            //user처음 생성 시 자/모음 주기
            hangulOwnService.createUserHangle(wallet_address);
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
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }
        List<Object[]> result = hangulRepository.findHangulOwnedByUser(user);
        for(Object[] obj : result){
            Hangul hangul = (Hangul) obj[0];
            HangulOwn hangulOwn = (HangulOwn) obj[1];
            resMap.put(hangul.getLetter(), hangulOwn.getHangulCount());
        }

        return resMap;
    }

    @Override
    public List<HangulInfoDto> getUserConsonant(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }

        List<Object[]> list = hangulRepository.findConsonantsOwnedByUser(user);
        return makeHangulInfoDtoList(list);
    }

    @Override
    public List<HangulInfoDto> getUserVowel(String wallet_address) {
        User user = userRepository.findByWalletAddress(wallet_address).orElse(null);
        if(user == null) {
            throw new IllegalArgumentException();
        }

        List<Object[]> list = hangulRepository.findVowelsOwnedByUser(user);
        return makeHangulInfoDtoList(list);
    }

    private List<HangulInfoDto> makeHangulInfoDtoList(List<Object[]> list) {
        List<Hangul> hangulList = new ArrayList<>();
        List<Integer> countList = new ArrayList<>();
        for(Object[] obj : list) {
            hangulList.add((Hangul) obj[0]);
            countList.add((Integer) obj[1]);
        }

        List<HangulInfoDto> dtoList = new ArrayList<>();
        for(int i=0; i<list.size(); i++) {
            Hangul hangul = hangulList.get(i);
            dtoList.add(HangulInfoDto.builder()
                            .hangulId(hangul.getId())
                            .quantity(countList.get(i))
                            .description(hangul.getDescription())
                            .title(hangul.getTitle())
                            .build());
        }

        return dtoList;
    }

    @Transactional
    @Override
    public User findByUserWalletAddress(String walletAddress) {
        return userRepository.findByWalletAddress(walletAddress).orElse(null);
    }

    @Transactional
    @Override
    public void minusUserTickets(User user, int drawQuantity) {
        user.setTicketCount(user.getTicketCount()-drawQuantity);
        userRepository.save(user);
    }

    @Transactional
    @Override
    public void plusUserTickets(User user, int drawQuantity) {
        user.setTicketCount(user.getTicketCount()+drawQuantity);
        userRepository.save(user);
    }
}
