package com.ssafy.backend.service;

import com.ssafy.backend.dto.LikeDto;
import org.springframework.transaction.annotation.Transactional;

public interface SeleniumService {
    @Transactional
    String makeName(String englishName);
}
