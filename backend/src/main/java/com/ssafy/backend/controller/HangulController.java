package com.ssafy.backend.controller;

import com.ssafy.backend.db.entity.Hangul;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.dto.HangulUseDto;
import com.ssafy.backend.dto.RandomDrawDto;
import com.ssafy.backend.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

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
        hangul = List.of("","ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ",
                "ㅌ", "ㅍ", "ㅎ", "ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ", "ㄳ", "ㄵ", "ㄶ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ",
                "ㅀ","ㅄ","ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ", "ㅐ", "ㅒ", "ㅔ", "ㅖ", "ㅚ",
                "ㅟ", "ㅢ", "ㅘ", "ㅝ", "ㅙ", "ㅞ");
    }


    @ApiOperation(value = "초성 반환하기")
    @GetMapping(value = "/first")
    public ResponseEntity<List<String>> getFirst(){
        List<String> firstHangul = hangul.subList(1,20);
        return new ResponseEntity<>(firstHangul, HttpStatus.OK);
    }

    @ApiOperation(value = "종성 반환하기")
    @GetMapping(value = "/last")
    public ResponseEntity<List<String>> getLast(){
        List<String> lastHangul = hangul.subList(1,31);
        return new ResponseEntity<>(lastHangul, HttpStatus.OK);
    }

    @ApiOperation(value = "중성 반환하기")
    @GetMapping(value = "/middle")
    public ResponseEntity<List<String>> getMiddle(){
        List<String> middleHangul = hangul.subList(31,52);
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

}
