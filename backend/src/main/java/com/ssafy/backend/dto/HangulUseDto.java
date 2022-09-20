package com.ssafy.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

//티켓이나 단어 합성을 통해서 자/모음 증감할 때 호출되는 객체
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HangulUseDto {
    private String userWalletAddress;
    private List<String> hangul;
}
