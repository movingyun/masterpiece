package com.ssafy.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//Client한테 Game에 대한 정보 보내주기 위한 객체
public class GameDto {
    private Integer gameId;
    private List<QuestionDto> questionOption;
    private List<Integer> questionAnswer;
}
