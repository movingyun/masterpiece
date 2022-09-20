package com.ssafy.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//Client한테 게임 종료 시 받을 정보 객체
public class UserSelectDto {
    private int gameId;
    private Integer[] userSelect;
}
