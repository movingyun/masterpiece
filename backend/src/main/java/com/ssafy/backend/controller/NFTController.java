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

import java.util.HashMap;
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
    public ResponseEntity setNFTNotSale(@RequestBody Map<String, String> map) {
        try{
            nftService.updatePossessed(map.get("nftAddress"));
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
            nftService.updateOnSale(String.valueOf(map.get("nftAddress")), String.valueOf(map.get("price")));
            return new ResponseEntity(HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "NFT 상세 조회 API", description = "해당 주소의 NFT 정보 반환")
    @GetMapping("/detail")
    public ResponseEntity getNFTInfo(@RequestParam(value = "nft-address") String nft_address) {
        try{
            return new ResponseEntity(nftService.getNFTDto(nft_address), HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "판매 중인 NFT 전체 조회 API", description = "모든 NFT의 목록 반환")
    @GetMapping
    public ResponseEntity getAllNFTs() {
        try{
            return new ResponseEntity(nftService.getAllNFT(), HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "판매 중인 NFT 검색 API", description = "해당 카테고리와 키워드의 NFT 목록 반환")
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

    @Operation(summary = "NFT 소유주 지갑 주소 조회 API", description = "nft 해시를 입력으로 받아 소유자 지갑 주소 반환")
    @GetMapping("/owner")
    public ResponseEntity getNFTOwner(@RequestParam String nftHash) {
        Map<String, String> map = new HashMap<>();
        try{
            map.put("walletAddress", nftService.getOwnerAddress(nftHash));
            return new ResponseEntity(map, HttpStatus.OK);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
