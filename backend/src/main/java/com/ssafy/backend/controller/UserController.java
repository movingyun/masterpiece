package com.ssafy.backend.controller;

import com.ssafy.backend.dto.HangulInfoDto;
import com.ssafy.backend.dto.NFTDto;
import com.ssafy.backend.dto.UserSigninDto;
import com.ssafy.backend.dto.UserUpdateDto;
import com.ssafy.backend.service.NFTService;
import com.ssafy.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
@Slf4j
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    NFTService nftService;


//    @Operation(summary = "회원가입 API", description = "회원 정보를 인풋으로 받아 회원가입 처리")
//    @PostMapping("/signup")
//    public ResponseEntity register(@RequestBody UserSignupDto dto) {
//        try {
//            userService.register(dto);
//        } catch(Exception e){
//            System.out.println("유저 회원가입 실패!");
//            return new ResponseEntity(HttpStatus.BAD_REQUEST);
//        }
//        return new ResponseEntity(HttpStatus.OK);
//    }

    @Operation(summary = "로그인 API", description = "wallet_address를 인풋으로 받아 로그인 처리")
    @PostMapping("/signin")
    public ResponseEntity<UserSigninDto> login(@RequestBody Map<String, String> map) {
        String wallet_address = map.get("wallet_address");
        try{
            //wallet_address로 유저 검색하여 있으면 db에 새로 저장
            UserSigninDto dto = userService.signin(wallet_address);
            return new ResponseEntity(dto, HttpStatus.OK);
        } catch(Exception e){
            System.out.println("유저 로그인 실패!");
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "유저 정보 조회 API", description = "wallet_address로 해당 유저 정보 반환")
    @GetMapping
    public ResponseEntity<UserSigninDto> getUserInfo(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            UserSigninDto dto = userService.getUserInfo(wallet_address);
            return new ResponseEntity(dto, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "유저 정보 수정 API", description = "해당 유저 정보 수정")
    @PutMapping
    public ResponseEntity updateUserInfo(@ModelAttribute UserUpdateDto dto) {
        System.out.println(dto);
        try{
            userService.updateUserInfo(dto);
            return new ResponseEntity(HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "티켓 수 조회 API", description = "해당 유저의 보유한 티켓 수 반환")
    @GetMapping("/ticket")
    public ResponseEntity getTicket(@RequestParam(value = "wallet-address") String wallet_address) {
        Map<String, Integer> map = new HashMap<>();
        try{
            int cnt = userService.getTicketCount(wallet_address);
            map.put("quantity", cnt);
            return new ResponseEntity(map, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "보유한 자모음 조회 API", description = "해당 유저의 보유한 자모음 반환")
    @GetMapping("/hangul")
    public ResponseEntity getHangul(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            Map<String, Integer> map = userService.getUserHangul(wallet_address);
            return new ResponseEntity(map, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "보유한 NFT 조회 API", description = "해당 유저의 보유한 NFT 목록 반환")
    @GetMapping("/collected")
    public ResponseEntity getCollectedNFT(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            List<NFTDto> dtoList = nftService.getCollectedNft(wallet_address);
            return new ResponseEntity(dtoList, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "만든 NFT 조회 API", description = "해당 유저가 민팅한 NFT 목록 반환")
    @GetMapping("/created")
    public ResponseEntity getCreatedNFT(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            List<NFTDto> dtoList = nftService.getCreatedNft(wallet_address);
            return new ResponseEntity(dtoList, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "팔고있는 NFT 조회 API", description = "해당 유저가 팔고있는 NFT 목록 반환")
    @GetMapping("/onsale")
    public ResponseEntity getOnSaleNFT(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            List<NFTDto> dtoList = nftService.getOnSaleNft(wallet_address);
            return new ResponseEntity(dtoList, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "좋아요 한 NFT 조회 API", description = "해당 유저가 찜한 NFT 목록 반환")
    @GetMapping("/favorite")
    public ResponseEntity getLikedNFT(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            List<NFTDto> dtoList = nftService.getLikedNft(wallet_address);
            return new ResponseEntity(dtoList, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "보유한 자/모음 조회 API", description = "해당 유저의 자/모음 inventory 반환")
    @GetMapping("/inventory")
    public ResponseEntity getInventory(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            Map<String, List<HangulInfoDto>> resMap = new HashMap<>();
            List<HangulInfoDto> consonantList = userService.getUserConsonant(wallet_address);
            List<HangulInfoDto> vowelList = userService.getUserVowel(wallet_address);
            resMap.put("consonant", consonantList);
            resMap.put("vowel", vowelList);
            return new ResponseEntity(resMap, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
