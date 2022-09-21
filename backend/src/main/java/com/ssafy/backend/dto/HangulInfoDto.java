package com.ssafy.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HangulInfoDto {
    int hangulId;
    int quantity;
    String description;
    String title;
}
