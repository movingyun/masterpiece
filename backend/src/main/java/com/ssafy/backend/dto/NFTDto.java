package com.ssafy.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class NFTDto {
    String imgUrl;
    String nftAddress;
    String nftTitle;
    String nftPrice;
    String nftCreatorNickname;
    String lastPrice;
    String nftOwnerNickname;
    List<String> nftTags;
    int nftLike;
}
