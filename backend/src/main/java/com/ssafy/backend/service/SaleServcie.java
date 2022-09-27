package com.ssafy.backend.service;

import com.ssafy.backend.dto.SaleResultDto;
import com.ssafy.backend.dto.SalelogDto;

import java.util.List;


public interface SaleServcie {
    void createSaleLog(SaleResultDto saleResultDto);
    List<SalelogDto> getSaleLog(String nftAddress);
}
