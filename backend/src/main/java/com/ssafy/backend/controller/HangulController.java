package com.ssafy.backend.controller;

import com.ssafy.backend.db.entity.Hangul;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.dto.HangulUseDto;
import com.ssafy.backend.dto.RandomDrawDto;
import com.ssafy.backend.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Api(value = "한글 API", tags = {"Hangul"})
@RequiredArgsConstructor
@RequestMapping(value = "/api/hangul")
@Log4j2
public class HangulController {

    @Autowired
    private HangulService hangulService;
    @Autowired
    private HangulOwnService hangulOwnService;
    @Autowired
    private UserService userService;

    private List<String> hangul;

    @PostConstruct
    private void init(){
        hangul = List.of("","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄸ","ㄹ"
                ,"ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ"
                ,"ㅄ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ"
                ,"ㅍ","ㅎ","ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ"
                ,"ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ"
                ,"ㅡ","ㅢ","ㅣ");
//
//        num = 0;
//        List<String> consonantList = hangulService.getAllConsonants();
//        System.out.println("==============consonantList===============");
//        for(String s : consonantList) {
//            System.out.print(s+" ");
//            firstMap.put(s, num++);
//        }
    }


    @ApiOperation(value = "초성 반환하기")
    @GetMapping(value = "/first")
    public ResponseEntity<List<Hangul>> getFirst(){
        List<Hangul> firstHangul = hangulService.getFirstConsonantsInfo();
        return new ResponseEntity<>(firstHangul, HttpStatus.OK);
    }

    @ApiOperation(value = "종성 반환하기")
    @GetMapping(value = "/last")
    public ResponseEntity<List<Hangul>> getLast(){
        List<Hangul> lastHangul = hangulService.getLastConsonantsInfo();
        return new ResponseEntity<>(lastHangul, HttpStatus.OK);
    }

    @ApiOperation(value = "중성 반환하기")
    @GetMapping(value = "/middle")
    public ResponseEntity<List<Hangul>> getMiddle(){
        List<Hangul> middleHangul = hangulService.getLastConsonantsInfo();
        return new ResponseEntity<>(middleHangul, HttpStatus.OK);
    }

    @ApiOperation(value = "유저 자/모음 사용")
    @PutMapping("")
    public ResponseEntity<String> hangulUse(@RequestBody HangulUseDto hangulUse){
        String userWalletAddress = hangulUse.getUserWalletAddress();
        // userWalletAddress로 user정보 가져오기
        User user = userService.findByUserWalletAddress(userWalletAddress);
        int userId = user.getId();

        //사용한 만큼 빼고 다시 db 저장
        List<String> usedHangulList = hangulUse.getHangul();
        for(String usedHangul : usedHangulList){
            int hangulId = hangul.indexOf(usedHangul);
            hangulOwnService.minusUserHangle(userId, hangulId);
        }
        //반환
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    //뽑기관련
    @ApiOperation(value = "자음 뽑기")
    @PutMapping("/constant")
    public ResponseEntity<List<Hangul>> constantPick(@RequestBody RandomDrawDto randomDraw){
        String userWalletAddress = randomDraw.getUserWalletAddress();
        // userWalletAddress로 user정보 가져오기
        User user = userService.findByUserWalletAddress(userWalletAddress);
        int userId = user.getId();
        int drawQuantity = randomDraw.getQuantity();

        //유저의 티켓이 충분한지 확인
        int userTicket = user.getTicketCount();

        //티켓이 없으면 오류 ㄱㄱ
        if(userTicket<drawQuantity){
            System.out.println("티켓 더 벌어오세요");
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        // drawQuantity만큼 userTicket줄이기
        userService.minusUserTickets(user, drawQuantity);

        //quantity만큼 자음 id 랜덤으로 뽑기(중복 허용)
        List<Integer> constantIdSet = hangulService.pickRandomConstant(drawQuantity);
        List<Hangul> constantList = new ArrayList<>();
        for(int constantId : constantIdSet){
            //id에 해당하는 자음 정보를 리스트에 넣어주기
            Hangul pickedConstant = hangulService.findHangulByid(constantId);
            constantList.add(pickedConstant);

            //id에 해당하는 자음 user의 보유갯수 올려주기
            System.out.println(pickedConstant.getTitle());
            System.out.println("userId : "+userId + "constantId : " + constantId);
            hangulOwnService.plusUserHangle(userId, constantId);
        }
        return new ResponseEntity<>(constantList, HttpStatus.OK);
    }

    @ApiOperation(value = "모음 뽑기")
    @PutMapping("/vowel")
    public ResponseEntity<List<Hangul>> vowelPick(@RequestBody RandomDrawDto randomDraw){
        String userWalletAddress = randomDraw.getUserWalletAddress();
        // userWalletAddress로 user정보 가져오기
        User user = userService.findByUserWalletAddress(userWalletAddress);
        int userId = user.getId();
        int drawQuantity = randomDraw.getQuantity();

        //유저의 티켓이 충분한지 확인
        int userTicket = user.getTicketCount();

        //티켓이 없으면 오류 ㄱㄱ
        if(userTicket<drawQuantity){
            System.out.println("티켓 더 벌어오세요");
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        // drawQuantity만큼 userTicket줄이기
        userService.minusUserTickets(user, drawQuantity);

        //quantity만큼 모음 id 랜덤으로 뽑기(중복 허용)
        List<Integer> Vowel = hangulService.pickRandomVowel(drawQuantity);

        List<Hangul> vowelList = new ArrayList<>();
        for(int vowelId : Vowel){
            //id에 해당하는 모음 정보를 리스트에 넣어주기
            Hangul pickedVowel = hangulService.findHangulByid(vowelId);
            vowelList.add(pickedVowel);

            //id에 해당하는 모음 user의 보유갯수 올려주기
            hangulOwnService.plusUserHangle(userId, vowelId);
        }
        //client로 넘겨주기
        return new ResponseEntity<>(vowelList, HttpStatus.OK);
    }

    @Operation(summary = "보유한 초성 자음 개수 조회 API", description = "해당 유저가 보유하고 있는 초성 목록 반환")
    @GetMapping("/own/first")
    public ResponseEntity getOwnedFirstConsonant(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            Map<String, Integer> map = hangulService.getFirstConsonantMap(wallet_address);
            return new ResponseEntity(map, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "보유한 중성 모음 개수 조회 API", description = "해당 유저가 보유하고 있는 모음 목록 반환")
    @GetMapping("/own/middle")
    public ResponseEntity getOwnedMiddleVowel(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            Map<String, Integer> map = hangulService.getMiddleVowelMap(wallet_address);
            return new ResponseEntity(map, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "보유한 종성 자음 개수 조회 API", description = "해당 유저가 보유하고 있는 종성 목록 반환")
    @GetMapping("/own/last")
    public ResponseEntity getOwnedLastConsonant(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            Map<String, Integer> map = hangulService.getLastConsonantMap(wallet_address);
            return new ResponseEntity(map, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "보유한 자음 개수 조회 API", description = "해당 유저가 보유하고 있는 자음 목록 반환")
    @GetMapping("/own/consonant")
    public ResponseEntity getAllOwnedConsonant(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            Map<String, Integer> map = hangulService.getConsonantMap(wallet_address);
            return new ResponseEntity(map, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
