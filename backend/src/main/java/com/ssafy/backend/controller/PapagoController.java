package com.ssafy.backend.controller;

import com.ssafy.backend.dto.TranslateDto;
import com.ssafy.backend.service.PapagoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(value = "파파고 번역 API", tags = {"파파고 번역기"})
@RequiredArgsConstructor
@RequestMapping(value = "/api/papago")
@Log4j2
@CrossOrigin("*")
class PapagoController {

    @Autowired
    PapagoService papagoService;

    @PostMapping(value="",produces = "text/plain;charset=UTF-8")
    @ApiOperation(value = "번역하기", notes = "번역하기")
    public ResponseEntity<String> sale(@RequestBody TranslateDto translateDto) {
        if(translateDto.getTarget().equals(translateDto.getSource())){
            return new ResponseEntity<>("같은 언어로 번역 할 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        String word = papagoService.translateByPapago(translateDto);
        System.out.println(word);
        return new ResponseEntity<>(word, HttpStatus.OK);
    }
}
