package com.ssafy.backend.controller;

import com.ssafy.backend.dto.NFTCreateDto;
import com.ssafy.backend.service.ConvertService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@Api(value = "영어 -> 한글 표기 변환 API", tags = {"Jsoup 크롤링"})
@RequestMapping("/api/convert")
@CrossOrigin("*")
public class ConvertController {
    @Autowired
    ConvertService convertService;

    @Operation(summary = "영어 한글 표기 변환 API", description = "영어를 입력하면 한글 발음을 반환")
    @GetMapping
    public ResponseEntity convertEnglishToHangul(@RequestParam String keyword) {
        Map<String, String> map = new HashMap<>();
        try{
            map.put("result", convertService.convert(keyword));
            return new ResponseEntity(map, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
