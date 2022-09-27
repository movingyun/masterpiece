package com.ssafy.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Builder
@Data
public class SalelogDto {
    private String sellerWalletAddress;
    private String buyerWalletAddress;
    private Date datetime;
    private String price;
}
