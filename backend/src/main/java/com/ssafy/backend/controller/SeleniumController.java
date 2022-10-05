package com.ssafy.backend.controller;

import com.ssafy.backend.service.SeleniumService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(value = "makeName API", tags = {"이름 만들어주기"})
@RequestMapping(value = "/api/convert")
@Log4j2
@CrossOrigin("*")
public class SeleniumController {

    @Autowired
    SeleniumService seleniumService;

    @GetMapping(value="",produces = "text/plain;charset=UTF-8")
    @ApiOperation(value = "이름 만들기", notes = "이름 만들기")
    public ResponseEntity<String> makeName(@RequestParam(value = "englishname") String englishName) {
        String hangulName = seleniumService.makeName(englishName);
        System.out.println(hangulName);
        return new ResponseEntity<>(hangulName, HttpStatus.OK);
    }
}