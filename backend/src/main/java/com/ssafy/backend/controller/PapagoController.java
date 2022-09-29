package com.ssafy.backend.controller;

import com.ssafy.backend.dto.SaleResultDto;
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

    @PostMapping("")
    @ApiOperation(value = "번역하기", notes = "번역하기")
    public ResponseEntity<String> sale(@RequestBody TranslateDto translateDto) {
        String word = papagoService.translateByPapago(translateDto);
        return new ResponseEntity<>(word, HttpStatus.OK);
    }
}
