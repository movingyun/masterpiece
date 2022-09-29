package com.ssafy.backend.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class NFTCreateDto {
    MultipartFile imgFile;
    String cid;
    Integer tokenId;
    String contractAddress;
    String txHash;
    String creatorWalletAddress;
    String nftTitle;
    String nftDescription;
    String nftTag;
}
