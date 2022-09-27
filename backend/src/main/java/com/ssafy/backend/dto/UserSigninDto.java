package com.ssafy.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserSigninDto {
    String wallet_address;
    String nickname;
    String message;
    String joinDate;
    int ticketCount;
    String profileImage;
}
