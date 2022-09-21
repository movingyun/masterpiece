package com.ssafy.backend.db.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/**
 * NFT 좋아요 테이블
 */
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
public class UserLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false,
            columnDefinition = "INT(11)")
    private Integer id;

    @ManyToOne //객체관계 생성 -> 한 유저가 여러 글에 좋아요 누를 수 있음
    @JoinColumn(name="userId")
    private User user;

    @ManyToOne //객체관계 생성 -> 하나의 게시글 좋아요 여러개 가능
    @JoinColumn(name="nftId")
    private Nft nft;

    @ApiModelProperty(value = "좋아요취소 여부")
    @Column(name = "isCancel", columnDefinition = "boolean DEFAULT false")
    private boolean isCancel;

}
