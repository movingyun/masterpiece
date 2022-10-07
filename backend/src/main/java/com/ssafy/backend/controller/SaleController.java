package com.ssafy.backend.controller;

import com.ssafy.backend.dto.SaleResultDto;
import com.ssafy.backend.dto.SalelogDto;
import com.ssafy.backend.service.NFTService;
import com.ssafy.backend.service.SaleServcie;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value = "NFT 판매 API", tags = {"Sale NFT"})
@RequiredArgsConstructor
@RequestMapping(value = "/api/sale")
@Log4j2
@CrossOrigin("*")
public class SaleController {
    @Autowired
    SaleServcie saleServcie;
    @Autowired
    NFTService nftService;

    @PostMapping("")
    @ApiOperation(value = "NFT 판매 결과기록 및 소유자 변경", notes = "NFT 판매 결과기록 및 소유자 변경")
    public ResponseEntity<String> sale(@RequestBody SaleResultDto saleResultDto) {
        //판매 기록 create
        saleServcie.createSaleLog(saleResultDto);
        //NFT소유주 바꿔주기
        nftService.modifyNftOwner(saleResultDto);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @ApiOperation(value = "판매log 조회", notes = "판매 기록 조회")
    @GetMapping
    public ResponseEntity<List<SalelogDto>> getSaleLog(@RequestParam(value = "nftHash") String nftHash) {
        //판매 기록 가져오기
        List<SalelogDto> saleLogs = saleServcie.getSaleLog(nftHash);
        return new ResponseEntity<>(saleLogs, HttpStatus.OK);
    }


}
