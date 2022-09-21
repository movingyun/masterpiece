package com.ssafy.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//뽑기를 할때 받을 객체
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RandomDrawDto {
    private  String userWalletAddress;
    private  int quantity;
}
