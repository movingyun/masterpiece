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

    @Operation(summary = "NFT를 소유 중으로 변경하는 API", description = "해당 NFT를 소유 중으로 설정")
    @PutMapping("/posession")
    public ResponseEntity setNFTNotSale(@RequestBody Map<String, Integer> map) {
        try{
            nftService.updatePossessed(map.get("nftId"));
            return new ResponseEntity(HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "NFT를 판매 중으로 변경하는 API", description = "해당 NFT를 판매 중으로 설정")
    @PutMapping("/sale")
    public ResponseEntity setNFTOnSale(@RequestBody Map<String, Object> map) {
        try{
            nftService.updateOnSale((int)map.get("nftId"), String.valueOf(map.get("price")));
            return new ResponseEntity(HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "NFT 전체 조회 API", description = "모든 NFT의 목록 반환")
    @GetMapping
    public ResponseEntity getAllNFTs() {
        try{
            return new ResponseEntity(nftService.getAllNFT(), HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "NFT 검색 API", description = "해당 카테고리와 키워드의 NFT 목록 반환")
    @GetMapping("/search")
    public ResponseEntity searchNFT(@RequestParam String category, @RequestParam String keyword) {
        try{
            List<NFTDto> dtoList = nftService.searchByCategory(category, keyword);
            return new ResponseEntity(dtoList, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
