package com.ssafy.backend.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class UserUpdateDto {
    @NonNull
    String wallet_address;
    @NonNull
    String nickname;
    String message;
    MultipartFile profileImage;
}
