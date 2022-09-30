package com.ssafy.backend.service;

import com.ssafy.backend.dto.TranslateDto;

public interface PapagoService {

    String translateByPapago(TranslateDto translateDto);
}
