package com.ssafy.backend.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/api/hangul")
@Log4j2
public class HangulController {

    private List<String> hangul;

    @PostConstruct
    private void init(){
        hangul = List.of("ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ",
                "ㅌ", "ㅍ", "ㅎ", "ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ", "ㄳ", "ㄵ", "ㄶ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ",
                "ㅀ","ㅄ","ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ", "ㅐ", "ㅒ", "ㅔ", "ㅖ", "ㅚ",
                "ㅟ", "ㅢ", "ㅘ", "ㅝ", "ㅙ", "ㅞ");
    }


    @ApiOperation(value = "초성 반환하기")
    @GetMapping(value = "/first")
    public ResponseEntity<List<String>> getFirst(){
        List<String> firstHangul = hangul.subList(0,19);
        return new ResponseEntity<>(firstHangul, HttpStatus.OK);
    }

    @ApiOperation(value = "종성 반환하기")
    @GetMapping(value = "/last")
    public ResponseEntity<List<String>> getLast(){
        List<String> lastHangul = hangul.subList(0,30);
        return new ResponseEntity<>(lastHangul, HttpStatus.OK);
    }

    @ApiOperation(value = "중성 반환하기")
    @GetMapping(value = "/middle")
    public ResponseEntity<List<String>> getMiddle(){
        List<String> middleHangul = hangul.subList(30,51);
        return new ResponseEntity<>(middleHangul, HttpStatus.OK);
    }

}
