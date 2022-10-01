package com.ssafy.backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SaleResultDto {
    private String nftHash;
    private String buyerWalletAddress;
    private String saleContractAddress;
}
