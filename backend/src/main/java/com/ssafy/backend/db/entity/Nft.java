package com.ssafy.backend.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * NFT 테이블
 */
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
public class Nft {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false,
            columnDefinition = "INT(11)")
    private Integer id;

    @ManyToOne //객체관계 생성 -> 한명의 유저는 여러개의 NFT 제작 가능
    @JoinColumn(name="creatorId")
    private User creator;

    @ManyToOne //객체관계 생성 -> 한명의 유저는 여러개의 NFT 소유 가능
    @JoinColumn(name="ownerId")
    private User owner;

    @Column(name = "tokenId")
    private Integer tokenId;

    @Column(name = "contractAddress", length = 50)
    private String contractAddress;

    @Column(name = "nftHash", length = 255)
    private String nftHash;

    @Column(name = "nftTitle", length = 50)
    private String nftTitle;

    @Column(name = "nftDescription", columnDefinition = "TEXT")
    private String nftDescription;

    @Column(name = "nftTag", length = 500)
    private String nftTag;

    @ApiModelProperty(value = "판매중 여부")
    @Column(name = "isSale", columnDefinition = "boolean DEFAULT false")
    private boolean isSale;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "tokenCreatedate", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date tokenCreatedate;

    @Column(name = "price")
    private String price;

    @Column(name = "imageUrl")
    private String imageUrl;

    @Column(name = "ipfsUrl")
    private String ipfsUrl;
}
