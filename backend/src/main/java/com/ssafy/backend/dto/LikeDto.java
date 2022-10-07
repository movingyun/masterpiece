package com.ssafy.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//좋아요 누를때 받을 객체
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LikeDto {
    private String userWalletAddress;
    private String nftHash;
}
