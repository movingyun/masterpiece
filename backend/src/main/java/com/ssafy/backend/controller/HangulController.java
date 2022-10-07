package com.ssafy.backend.controller;

import com.ssafy.backend.db.entity.Hangul;
import com.ssafy.backend.db.entity.User;
import com.ssafy.backend.dto.HangulUseDto;
import com.ssafy.backend.dto.RandomDrawDto;
import com.ssafy.backend.service.HangulOwnService;
import com.ssafy.backend.service.HangulService;
import com.ssafy.backend.service.UserService;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Api(value = "한글 API", tags = {"Hangul"})
@RequiredArgsConstructor
@RequestMapping(value = "/api/hangul")
@Log4j2
@CrossOrigin("*")
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
        List<Hangul> middleHangul = hangulService.getMiddleVowelsInfo();
        return new ResponseEntity<>(middleHangul, HttpStatus.OK);
    }

    @ApiOperation(value = "유저 자/모음 충분한지 확인")
    @PostMapping("/count")
    public ResponseEntity<Boolean> hangulEnough(@RequestBody HangulUseDto hangulUse){
        String userWalletAddress = hangulUse.getUserWalletAddress();
        // userWalletAddress로 user정보 가져오기
        User user = userService.findByUserWalletAddress(userWalletAddress);
        int userId = user.getId();

        //충분한지 확인
        List<String> usedHangulList = hangulUse.getHangul();
        Map<Integer , Integer> useHangulCnt = new HashMap<>();
        for(String usedHangul : usedHangulList){
            int hangulId = hangul.indexOf(usedHangul);
            useHangulCnt.put(hangulId,useHangulCnt.getOrDefault(hangulId,0)+1);
        }
        for(Integer hangulId : useHangulCnt.keySet()){
            int useCnt = useHangulCnt.get(hangulId);
            int haveCnt = hangulOwnService.findHangulOwnByUserAndHangulId(userId, hangulId).getHangulCount();
            if(useCnt>haveCnt){
                return new ResponseEntity<>(false, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(true, HttpStatus.OK);
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
    @PutMapping("/pick/consonant")
    public ResponseEntity<List<Hangul>> constantPick(@RequestBody RandomDrawDto randomDraw){
        String userWalletAddress = randomDraw.getUserWalletAddress();
        // userWalletAddress로 user정보 가져오기
        User user = userService.findByUserWalletAddress(userWalletAddress);
        int drawQuantity = randomDraw.getQuantity();

        //유저의 티켓이 충분한지 확인
        if(hangulService.checkUserTicket(user, drawQuantity)){
            //충분하면
            userService.minusUserTickets(user, drawQuantity);
            List<Hangul> constantList = hangulService.pickRandomConstant(user, drawQuantity);
            return new ResponseEntity<>(constantList, HttpStatus.OK);
        } else{
            //티켓 없으면
            return new ResponseEntity("No Ticket", HttpStatus.OK);
        }
    }

    @ApiOperation(value = "모음 뽑기")
    @PutMapping("/pick/vowel")
    public ResponseEntity<List<Hangul>> vowelPick(@RequestBody RandomDrawDto randomDraw){
        String userWalletAddress = randomDraw.getUserWalletAddress();
        // userWalletAddress로 user정보 가져오기
        User user = userService.findByUserWalletAddress(userWalletAddress);
        int drawQuantity = randomDraw.getQuantity();

        //유저의 티켓이 충분한지 확인
        if(hangulService.checkUserTicket(user, drawQuantity)){
            //충분하면
            userService.minusUserTickets(user, drawQuantity);
            List<Hangul> vowelList = hangulService.pickRandomVowel(user, drawQuantity);
            return new ResponseEntity<>(vowelList, HttpStatus.OK);
        } else{
            //티켓 없으면
            return new ResponseEntity("No Ticket", HttpStatus.OK);
        }
    }

    @Operation(summary = "보유한 초성 자음 개수 조회 API", description = "해당 유저가 보유하고 있는 초성 목록 반환")
    @GetMapping("/own/first")
    public ResponseEntity getOwnedFirstConsonant(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            List<Integer> list = hangulService.getFirstConsonantList(wallet_address);
            return new ResponseEntity(list, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "보유한 중성 모음 개수 조회 API", description = "해당 유저가 보유하고 있는 모음 목록 반환")
    @GetMapping("/own/middle")
    public ResponseEntity getOwnedMiddleVowel(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            List<Integer> list = hangulService.getMiddleVowelList(wallet_address);
            return new ResponseEntity(list, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "보유한 종성 자음 개수 조회 API", description = "해당 유저가 보유하고 있는 종성 목록 반환")
    @GetMapping("/own/last")
    public ResponseEntity getOwnedLastConsonant(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            List<Integer> list = hangulService.getLastConsonantList(wallet_address);
            return new ResponseEntity(list, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "보유한 자음 개수 조회 API", description = "해당 유저가 보유하고 있는 자음 목록 반환")
    @GetMapping("/own/consonant")
    public ResponseEntity getAllOwnedConsonant(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            List<Integer> list = hangulService.getConsonantList(wallet_address);
            return new ResponseEntity(list, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "보유한 자음 개수 조회 API", description = "해당 유저가 보유하고 있는 자음 목록 반환")
    @GetMapping("/own/consonant2")
    public ResponseEntity getAllOwnedConsonant2(@RequestParam(value = "wallet-address") String wallet_address) {
        try{
            List<Integer> list = hangulService.getConsonantList2(wallet_address);
            return new ResponseEntity(list, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
