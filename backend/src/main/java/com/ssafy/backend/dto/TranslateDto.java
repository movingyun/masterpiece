package com.ssafy.backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TranslateDto {
    String source;
    String target;
    String text;
}
