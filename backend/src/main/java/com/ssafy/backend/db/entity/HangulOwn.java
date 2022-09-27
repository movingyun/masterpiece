package com.ssafy.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/**
 * 자/모음 보유여부 테이블
 */
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
public class HangulOwn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false,
            columnDefinition = "INT(11)")
    private Integer id;

    @ManyToOne //객체관계 생성 -> 한명의 유저는 여러개의 자/모음 보유 가능
    @JoinColumn(name="userId")
    private User user;

    @ManyToOne //객체관계 생성 -> 하나의 자/모음은 여러명의 유저가 보유 가능
    @JoinColumn(name="hangulId")
    private Hangul hangul;

    @Column(name = "hangulCount", columnDefinition = "INT(11) DEFAULT 3")
    private Integer hangulCount;

}
