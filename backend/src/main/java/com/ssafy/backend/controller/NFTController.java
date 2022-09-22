package com.ssafy.backend.controller;

import com.ssafy.backend.dto.NFTCreateDto;
import com.ssafy.backend.dto.NFTDto;
import com.ssafy.backend.service.NFTService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/nft")
@CrossOrigin("*")
@Slf4j
public class NFTController {

    @Autowired
    NFTService nftService;

    @Operation(summary = "NFT 생성 API", description = "민팅된 NFT 정보를 db에 저장")
    @PostMapping
    public ResponseEntity storeNFT(@ModelAttribute NFTCreateDto dto) {
        try{
            nftService.postNFT(dto);
            return new ResponseEntity(HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "NFT를 소유 중으로 변경 API", description = "해당 NFT를 소유 중으로 설정")
    @PutMapping("/posession")
    public ResponseEntity setNFTNotSale(@RequestBody Map<String, Object> map) {

        return new ResponseEntity(HttpStatus.OK);
    }

    @Operation(summary = "NFT를 판매 중으로 변경 API", description = "해당 NFT를 판매 중으로 설정")
    @PutMapping("/sale")
    public ResponseEntity setNFTOnSale(@RequestBody Map<String, Object> map) {

        return new ResponseEntity(HttpStatus.OK);
    }

    @Operation(summary = "NFT 전체 조회 API", description = "모든 NFT의 목록 반환")
    @GetMapping
    public ResponseEntity getAllNFTs() {

        return new ResponseEntity(HttpStatus.OK);
    }
}
